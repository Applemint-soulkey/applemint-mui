import {
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Head from "next/head";
import { NextPage } from "next";

import { useQuery } from "react-query";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  apiUrl,
  bookmarkModalOpenState,
  filterListState,
  ModalItemState,
  raindropModalOpenState,
} from "../store/common";
import ChipFilter from "../components/simple/chipFilter";
import ItemContainer from "../components/simple/itemContainer";
import RaindropModal from "../components/raindropModal";
import BookmarkModal from "../components/bookmarkModal";

const New: NextPage = () => {
  const collectionName = "new";
  const filterSelected = useRecoilValue(filterListState);
  const [filterOpen, setFilterOpen] = useState(false);
  const ModalItemData = useRecoilValue(ModalItemState);
  const [raindropModalOpen, setRaindropModalOpen] = useRecoilState(
    raindropModalOpenState
  );
  const [bookmarkModalOpen, setBookmarkModalOpen] = useRecoilState(
    bookmarkModalOpenState
  );
  const { data } = useQuery(collectionName + "Info", async () => {
    const res = await fetch(`${apiUrl}/collection/info/${collectionName}`);
    const json = await res.json();
    return json;
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
              {filterSelected.length == 0
                ? data?.totalCount
                : data?.groupInfos.find(
                    (group: { Domain: string; Count: number }) =>
                      group.Domain === filterSelected[0]
                  )?.Count}
            </span>
          </Typography>
          <IconButton
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          >
            <FilterAltIcon
              color={filterSelected.length > 0 ? "secondary" : "disabled"}
            />
          </IconButton>
        </div>
      </div>
      <Collapse in={filterOpen}>
        <div className="py-3">
          <Stack className="flex-wrap gap-1" direction="row">
            {data?.groupInfos.map((tag: { Domain: string; Count: number }) => (
              <ChipFilter
                key={tag.Domain}
                label={tag.Domain}
                count={tag.Count}
              />
            ))}
          </Stack>
        </div>
      </Collapse>
      <Divider />
      <ItemContainer collectionName={collectionName} />
      <RaindropModal
        raindropOpen={raindropModalOpen}
        setRaindropOpen={setRaindropModalOpen}
        data={ModalItemData}
      />
      <BookmarkModal
        bookmarkOpen={bookmarkModalOpen}
        setBookmarkOpen={setBookmarkModalOpen}
        data={ModalItemData}
      />
    </div>
  );
};

export default New;
