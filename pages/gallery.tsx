import {
  CircularProgress,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { apiUrl } from "../store/common";
import InfoIcon from "@mui/icons-material/Info";

const PAGE_SIZE = 20;
const handleGalleryItemsFetch = async ({ pageParam = 0 }) => {
  const res = await fetch(`${apiUrl}/gallery?cursor=${pageParam}`);
  const json = await res.json();
  return {
    data: json,
    nextCursor: json.length > 0 ? pageParam + PAGE_SIZE : undefined,
  };
};

const Gallery: NextPage<{}> = () => {
  const { ref, inView } = useInView();
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Gallery</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1 font-extrabold">
          Gallery
        </Typography>
      </div>
      <Divider />
      <div className="flex-1">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <p>{(error as Error).message}</p>
        ) : (
          <>
            <ImageList cols={3} rowHeight={164}>
              {data!!.pages.map((page) =>
                page?.data.map((item: { link: string; text: string }) => {
                  return (
                    <ImageListItem key={item.link}>
                      {item.link.includes(".mp4") ? (
                        <video
                          src={item.link}
                          controls
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src={item.link}
                          loading="lazy"
                          className="bg-white overflow-hidden"
                        />
                      )}

                      <ImageListItemBar
                        title={item.text === "" ? "Untitled" : item.text}
                        subtitle={item.link}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.text}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
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
    </div>
  );
};

export default Gallery;
