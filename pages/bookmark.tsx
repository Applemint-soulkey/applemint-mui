import { Box, Divider, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { getBookmarkListCall } from "../components/simple/api";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Bookmark</title>
      </Head>
      <Typography variant="h3" className="flex-1 font-extrabold">
        Bookmark
      </Typography>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {data?.map((item: any, index: number) => (
            <Tab
              className={
                value === index
                  ? "font-pretend font-extrabold"
                  : "font-pretend font-light"
              }
              key={index}
              label={item.Path}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        {data?.map((item: any, index: number) => (
          <TabPanel key={index} value={value} index={index}>
            <span className="font-semibold">{item.Path}</span>
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default Bookmark;
