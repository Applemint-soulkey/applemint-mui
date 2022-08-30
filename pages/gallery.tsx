import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Snackbar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  apiUrl,
  galleryColumnCountState,
  showThumbnailState,
} from "../store/common";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCall,
  dropboxCall,
  galleryItemsCall,
  getCollectionInfoCall,
} from "../components/api";
import { useRecoilValue } from "recoil";

const PAGE_SIZE = 20;

type GalleryItemProps = {
  id: string;
  text: string;
  link: string;
};

const handleGalleryItemsFetch = async ({ pageParam = 0 }) => {
  const json = await galleryItemsCall(pageParam);
  return {
    data: json.items,
    nextCursor: json.items.length > 0 ? pageParam + PAGE_SIZE : undefined,
  };
};

const handleDropboxCall = async (item: GalleryItemProps) => {
  const fileName =
    item.text === ""
      ? item.link.slice(item.link.lastIndexOf("/") + 1)
      : item.text + item.link.slice(item.link.lastIndexOf("."));
  const path = `/applemint/${fileName}`;

  return await dropboxCall(item.link, path);
};

const GalleryInfo: NextPage = () => {
  const { data } = useQuery("galleryInfo", async () => {
    return await getCollectionInfoCall("gallery");
  });
  return (
    <div id="info_breadcumb" className="flex items-end">
      <Typography variant="h6" className="mb-1">
        Items:{" "}
        <span id="item_count" className="font-bold">
          {data?.totalCount}
        </span>
      </Typography>
    </div>
  );
};

// Image List Item
const GalleryItem: NextPage<{
  item: GalleryItemProps;
  queryClient: QueryClient;
  setCurrentItem: Dispatch<SetStateAction<GalleryItemProps | undefined>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ item, queryClient, setCurrentItem, setDialogOpen }) => {
  const showThumbnail = useRecoilValue(showThumbnailState);
  const [isDeleteProgress, setIsDeleteProgress] = useState(false);

  // Delete Mutation
  const deleteMutation = useMutation(
    async (itemId: string) => await deleteCall(itemId, "gallery"),
    {
      onMutate: () => {
        setIsDeleteProgress(true);
        queryClient.invalidateQueries("galleryItems");
        queryClient.invalidateQueries("galleryInfo");
      },
      onSettled: () => {
        queryClient.invalidateQueries("galleryItems");
        queryClient.invalidateQueries("galleryInfo");
        setIsDeleteProgress(false);
      },
      onSuccess: () => {
        console.log("delete success");
        queryClient.invalidateQueries("galleryInfo");
        queryClient.invalidateQueries("galleryItems");
      },
    }
  );

  return isDeleteProgress ? (
    <ImageListItem>
      <CircularProgress />
    </ImageListItem>
  ) : (
    <ImageListItem
      key={item.link}
      className="min-h-fit max-h-48 cursor-pointer"
    >
      {showThumbnail ? (
        item.link.includes(".mp4") ? (
          <video
            src={item.link}
            autoPlay
            muted
            controls={false}
            className="w-full h-full"
            onClick={() => {
              setCurrentItem(item);
              setDialogOpen(true);
            }}
          />
        ) : // imgur image link optimization
        item.link.includes("i.imgur.com") ? (
          <Image
            src={item.link}
            alt={item.text}
            width={200}
            height={200}
            layout="intrinsic"
            objectFit="cover"
            onClick={() => {
              setCurrentItem(item);
              setDialogOpen(true);
            }}
          />
        ) : (
          <img
            src={item.link}
            alt={item.text}
            className="bg-white overflow-hidden"
            onClick={() => {
              setCurrentItem(item);
              setDialogOpen(true);
            }}
          />
        )
      ) : (
        <Image
          src="/image_placeholder.jpg"
          width={128}
          height={128}
          layout="responsive"
          onClick={() => {
            setCurrentItem(item);
            setDialogOpen(true);
          }}
        />
      )}
      <ImageListItemBar
        title={item.text === "" ? "Untitled" : item.text}
        subtitle={item.link}
        actionIcon={
          <IconButton
            color="primary"
            aria-label={`info about ${item.text}`}
            onClick={() => {
              deleteMutation.mutate(item.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

const Gallery: NextPage<{}> = () => {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItemProps>();
  const [dropboxSnackbarOpen, setDropboxSnackbarOpen] = useState(false);
  const galleryColumnCount = useRecoilValue(galleryColumnCountState);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDropboxSnackbarOpen(false);
  };

  // React Query
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery(
    "galleryItems",
    (pageParam) => handleGalleryItemsFetch(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }
  );

  // Set Ref for Scrolling
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const GalleryDetailDialog: NextPage = () => {
    return (
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentItem?.text}</DialogTitle>
        <DialogContent>
          <div>
            {currentItem?.link.includes(".mp4") ? (
              <video
                src={currentItem?.link}
                controls
                className="w-full h-full"
              />
            ) : (
              <img
                src={currentItem?.link}
                loading="lazy"
                className="bg-white overflow-hidden"
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="font-bold"
            onClick={() => {
              if (currentItem) {
                handleDropboxCall(currentItem).then((res) => {
                  console.log(res);
                  setDropboxSnackbarOpen(true);
                });
              }
            }}
            color="primary"
          >
            SAVE TO DROPBOX
          </Button>
          <Button
            className="font-bold"
            onClick={() => setOpen(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Gallery</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1">
          <span className="font-extrabold">Gallery</span>
        </Typography>
        <GalleryInfo />
      </div>
      <Divider />
      <div className="flex-1 mt-5">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <p>{(error as Error).message}</p>
        ) : (
          <>
            <ImageList cols={galleryColumnCount}>
              {data!!.pages.map((page) =>
                page?.data.map((item: GalleryItemProps, index: number) => {
                  return (
                    <GalleryItem
                      key={index}
                      item={item}
                      queryClient={queryClient}
                      setCurrentItem={setCurrentItem}
                      setDialogOpen={setOpen}
                    />
                  );
                })
              )}
            </ImageList>
          </>
        )}
      </div>
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="flex items-center justify-center w-full h-12 bg-gray-200 rounded-md"
        >
          {isFetchingNextPage ? (
            <CircularProgress />
          ) : hasNextPage ? (
            <CircularProgress />
          ) : (
            <></>
          )}
        </button>
      </div>
      <Snackbar
        open={dropboxSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`${currentItem?.text} save to Dropbox Request`}
      />
      <GalleryDetailDialog />
    </div>
  );
};

export default Gallery;
