import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { apiUrl } from "../../store/common";
import { ItemProps } from "../new";
import ItemCard from "./itemCard";

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

export default ItemContainer;
