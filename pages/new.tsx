import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { NextPage } from "next";
import Head from "next/head";
import { apiUrl } from "../store/common";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface NewProps {
  id: string;
  items: ItemProps[];
}

interface ItemProps {
  id: string;
  text_content: string;
  url: string;
  domain: string;
  tags: string[];
  timestamp: string;
  source: string;
  path: string;
}

const New: NextPage<NewProps> = () => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "newItems",
    async ({ pageParam = 0 }) => {
      const res = await fetch(`${apiUrl}/items/new?cursor=${pageParam}`);
      const json = await res.json();
      return {
        data: json,
        nextCursor: pageParam + json.length,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }
  );

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>New</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1 font-extrabold">
          New
        </Typography>
        <div id="info_breadcumb" className="">
          <Typography variant="h6">
            Items:{" "}
            <span id="item_count" className="font-bold">
              0
            </span>
          </Typography>
        </div>
      </div>
      <Divider />
      <div>
        {status === "loading" ? (
          <p>Loading..</p>
        ) : status === "error" ? (
          <p>error</p>
        ) : (
          <div id="item_container" className="mt-5 flex flex-col gap-5">
            <>
              {data?.pages.map((item) =>
                item.data.map((item: ItemProps) => (
                  <ItemCard key={item.id} {...item} />
                ))
              )}
            </>
            <div>
              <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="flex items-center justify-center w-full h-12 bg-gray-200 rounded-md"
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load Newer"
                  : "Nothing more to load"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemCard: NextPage<ItemProps> = (item: ItemProps) => {
  return (
    <Card>
      <Link href={item.url} passHref>
        <a target={`_blank`}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h4">
                <span className="font-semibold">
                  {item.text_content !== "" ? item.text_content : item.domain}
                </span>
              </Typography>
              <Typography variant="body1">
                <span>{item.url}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions className="flex">
        <div className="flex-1">
          <Chip label={item.domain} />
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <FlagIcon />
        </IconButton>
        <IconButton>
          <BookmarkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default New;
