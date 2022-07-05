import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRecoilState } from "recoil";
import {
  galleryColumnCountState,
  isDarkModeState,
  showThumbnailState,
} from "../store/common";

const Settings: NextPage = () => {
  const [showThumbnail, setShowThumbnail] = useRecoilState(showThumbnailState);
  const [galleryColumnCount, setGalleryColumnCount] = useRecoilState(
    galleryColumnCountState
  );
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Settings</title>
      </Head>
      <Typography variant="h3" className="flex-1 font-extrabold">
        Settings
      </Typography>
      <Divider />
      <Box className="my-3">
        <Typography variant="h5" className="font-bold">
          Common
        </Typography>
        <Box className="my-3">
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              Dark Mode
            </Typography>
            <Switch
              checked={isDarkMode}
              onChange={(event) => {
                setIsDarkMode(event.target.checked);
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              Clear Collection
            </Typography>
            <Button>Clear</Button>
          </div>
        </Box>
        <Divider className="my-3" />

        <Typography variant="h5" className="font-bold">
          Gallery
        </Typography>
        <Box className="my-3">
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              Show thumbnails
            </Typography>
            <Switch
              checked={showThumbnail}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setShowThumbnail(event.target.checked);
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              Gallery Column Rows
            </Typography>
            <FormControl size="small">
              <Select
                value={galleryColumnCount}
                onChange={(event) => {
                  setGalleryColumnCount(event.target.value as number);
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
