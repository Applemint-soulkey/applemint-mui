import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { apiUrl, filterListState } from "../../store/common";
import { ItemProps } from "./common";
import ItemCard from "./itemCard";

const handleNewItemsFetch = async ({ pageParam = 0 }, filter = "") => {
  const res = await fetch(
    `${apiUrl}/items/new?cursor=${pageParam}&filter=${filter}`
  );
  const json = await res.json();
  return {
    data: json,
    nextCursor: json.length > 0 ? pageParam + 10 : undefined,
  };
};

const ItemContainer: NextPage = () => {
  const { ref, inView } = useInView();
  const filter = useRecoilValue(filterListState);

  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
    isRefetching,
  } = useInfiniteQuery(
    "newItems",
    (pageParam) => handleNewItemsFetch(pageParam, filter[0]),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    refetch();
  }, [inView, filter]);

  return (
    <div>
      {status === "loading" || isRefetching ? (
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
