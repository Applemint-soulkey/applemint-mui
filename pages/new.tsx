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
import { useRecoilValue } from "recoil";

import { apiUrl, filterListState } from "../store/common";
import ItemContainer from "./new/itemContainer";
import ChipFilter from "./new/chipFilter";

const New: NextPage = () => {
  const filterSelected = useRecoilValue(filterListState);
  const [filterOpen, setFilterOpen] = useState(false);
  const { data } = useQuery("newInfo", async () => {
    const res = await fetch(`${apiUrl}/collection/info/new`);
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
      <ItemContainer />
    </div>
  );
};

export default New;
