import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { apiUrl, filterListState } from "../../store/common";
import { ItemProps } from "./common";
import ItemCard from "./itemCard";

const PAGE_SIZE = 20;

const handleNewItemsFetch = async (
  { pageParam = 0 },
  collectionName: string,
  filter = ""
) => {
  const res = await fetch(
    `${apiUrl}/items/${collectionName}?cursor=${pageParam}&filter=${filter}`
  );
  const json = await res.json();
  return {
    data: json,
    nextCursor: json.length > 0 ? pageParam + PAGE_SIZE : undefined,
  };
};

const ItemContainer: NextPage<{ collectionName: string }> = ({
  collectionName,
}) => {
  const { ref, inView } = useInView();
  const filter = useRecoilValue(filterListState);

  // Declare a new query hook
  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
    remove,
  } = useInfiniteQuery(
    collectionName + "Items",
    (pageParam) => handleNewItemsFetch(pageParam, collectionName, filter[0]),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    }
  );

  // Call fetchNextPage when the user scrolls to the bottom of the page.
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // Reload when filter changes
  useEffect(() => {
    remove();
    refetch();
  }, [filter]);

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
                <ItemCard
                  key={item.id}
                  itemData={item}
                  collectionName={collectionName}
                />
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
