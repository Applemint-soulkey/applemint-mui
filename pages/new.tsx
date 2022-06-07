import {
  Avatar,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { NextPage } from "next";
import Head from "next/head";
import { apiUrl } from "../store/common";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ItemCard from "./new/itemCard";

export interface NewProps {
  id: string;
  items: ItemProps[];
}

export interface ItemProps {
  id: string;
  text_content: string;
  url: string;
  domain: string;
  tags: string[];
  timestamp: string;
  source: string;
  path: string;
}

const New: NextPage = () => {
  const [filterSelected, setFilterSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(true);
  const { status, data, error } = useQuery("newInfo", async () => {
    const res = await fetch(`${apiUrl}/collection/info/new`);
    const json = await res.json();
    return {
      total: json.totalCount,
    };
  });
  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>New</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1 font-extrabold">
          New
        </Typography>
        <div id="info_breadcumb" className="flex items-end">
          <Typography variant="h6" className="mb-1">
            Items:{" "}
            <span id="item_count" className="font-bold">
              {data?.total}
            </span>
          </Typography>
          <IconButton
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          >
            <FilterAltIcon />
          </IconButton>
        </div>
      </div>
      <Collapse in={filterOpen}>
        <div className="py-3">
          <Stack direction="row">
            <Chip
              id="filter_battlepage"
              avatar={<Avatar>32</Avatar>}
              label="battlepage.com"
              onClick={() => {
                const newFilter = filterSelected.includes("battlepage.com")
                  ? filterSelected.filter((x) => x !== "battlepage.com")
                  : [...filterSelected, "battlepage.com"];
                setFilterSelected(newFilter);
              }}
              onDelete={() => {}}
              deleteIcon={
                filterSelected.includes("battlepage.com") ? (
                  <DeleteIcon />
                ) : (
                  <></>
                )
              }
            />
          </Stack>
        </div>
      </Collapse>
      <Divider />
      <ItemContainer />
    </div>
  );
};

const ItemContainer: NextPage = () => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery(
    "newItems",
    async ({ pageParam = 0 }) => {
      const res = await fetch(`${apiUrl}/items/new?cursor=${pageParam}`);
      const json = await res.json();
      return {
        data: json,
        nextCursor: json.length > 0 ? pageParam + 10 : undefined,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }
  );
  return (
    <div>
      {status === "loading" ? (
        <div id="loading_container" className="mt-5 flex justify-center">
          <CircularProgress />
        </div>
      ) : status === "error" ? (
        <p>{(error as Error).message}</p>
      ) : (
        <div id="item_container" className="mt-5 flex flex-col gap-5">
          <>
            {data?.pages.map((item) =>
              item?.data.map((item: ItemProps) => (
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
      )}
    </div>
  );
};

export default New;
