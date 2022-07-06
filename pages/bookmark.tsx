import { Box, Divider, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import BookmarkModal from "../components/modal/bookmarkModal";
import RaindropModal from "../components/modal/raindropModal";
import { getBookmarkListCall } from "../components/api";
import {
  ModalItemState,
  raindropModalOpenState,
  bookmarkModalOpenState,
} from "../store/common";
import ItemContainer from "../components/itemContainer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="">{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Bookmark: NextPage = () => {
  const [value, setValue] = useState(0);
  const { data } = useQuery("bookmark_list", getBookmarkListCall, {});

  const ModalItemData = useRecoilValue(ModalItemState);
  const [raindropModalOpen, setRaindropModalOpen] = useRecoilState(
    raindropModalOpenState
  );
  const [bookmarkModalOpen, setBookmarkModalOpen] = useRecoilState(
    bookmarkModalOpenState
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Bookmark</title>
      </Head>
      <div className="">
        <Typography variant="h3" className="flex-1">
          <span className="font-extrabold">Bookmark</span>
        </Typography>
        <Divider />
      </div>
      <Box
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderColor: "divider" }}
        >
          {data?.map((item: any, index: number) => (
            <Tab
              className={value === index ? "font-extrabold" : "font-light"}
              key={index}
              label={item.Path}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        {data?.map((item: any, index: number) => (
          <TabPanel key={index} value={value} index={index}>
            <ItemContainer
              collectionName="bookmark"
              domainFilter=""
              pathFilter={item.Path}
            />
          </TabPanel>
        ))}
        <RaindropModal
          raindropOpen={raindropModalOpen}
          setRaindropOpen={setRaindropModalOpen}
          data={ModalItemData}
        />
        <BookmarkModal
          bookmarkOpen={bookmarkModalOpen}
          setBookmarkOpen={setBookmarkModalOpen}
          itemData={ModalItemData}
          collection_origin="bookmark"
        />
      </Box>
    </div>
  );
};

export default Bookmark;
