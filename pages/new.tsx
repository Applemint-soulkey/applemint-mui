import {
  Avatar,
  Chip,
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
import { useQuery } from "react-query";
import { useState } from "react";
import ItemContainer from "./new/itemContainer";

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
  const { data } = useQuery("newInfo", async () => {
    const res = await fetch(`${apiUrl}/collection/info/new`);
    const json = await res.json();
    return {
      totalCount: json.totalCount,
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
              {data?.totalCount}
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

export default New;
