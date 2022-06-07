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
import { apiUrl, filterListState } from "../store/common";
import { useQuery } from "react-query";
import { useState } from "react";
import ItemContainer from "./new/itemContainer";
import { useRecoilState } from "recoil";

const ChipFilter: NextPage<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  const [filterSelected, setFilterSelected] = useRecoilState(filterListState);

  return (
    <Chip
      id={"filter_chip_" + label}
      avatar={<Avatar>{count}</Avatar>}
      label={label}
      onClick={() => {
        const newFilter = filterSelected.includes(label) ? [] : [label];
        console.log(newFilter);
        setFilterSelected(newFilter);
      }}
      onDelete={() => {}}
      deleteIcon={filterSelected.includes(label) ? <DeleteIcon /> : <></>}
    />
  );
};

const New: NextPage = () => {
  const [filterOpen, setFilterOpen] = useState(true);
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
