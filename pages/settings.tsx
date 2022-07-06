import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  clearCollectionCall,
  getCollectionListCall,
  manualCrawlCall,
} from "../components/api";
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
  const { data } = useQuery("collection_list", getCollectionListCall, {});
  const [targetCollection, setTargetCollection] = useState("");
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isManualClearDialogOpen, setIsManualClearDialogOpen] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const handleCloseClearDialog = () => {
    setIsClearDialogOpen(false);
  };
  const handleCloseManualClearDialog = () => {
    setIsManualClearDialogOpen(false);
  };

  const handleManualCrawlRequest = async () => {
    setIsCrawling(true);
    await manualCrawlCall();
    setIsCrawling(false);
    setIsManualClearDialogOpen(false);
  };

  const ManualCrawlDialog: NextPage = () => {
    return (
      <Dialog
        open={isManualClearDialogOpen}
        onClose={handleCloseManualClearDialog}
      >
        <DialogTitle>Manual Crawl</DialogTitle>
        <DialogContent>
          {isCrawling ? (
            <CircularProgress />
          ) : (
            <DialogContentText>
              Manual Crawl could be pressed to db server.
              <br /> And Side Effect is that all the collections will be
              crawled.
            </DialogContentText>
          )}
        </DialogContent>
        {!isCrawling && (
          <DialogActions>
            <Button onClick={handleCloseManualClearDialog}>Cancel</Button>
            <Button
              onClick={async () => {
                await handleManualCrawlRequest();
              }}
            >
              Crawl
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  };

  const CollectionClearDialog: NextPage = () => {
    return (
      <Dialog open={isClearDialogOpen} onClose={handleCloseClearDialog}>
        <DialogTitle>Clear Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to clear the collection '${targetCollection}'?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearDialog}>Cancel</Button>
          <Button
            onClick={async () => {
              let result = await clearCollectionCall(targetCollection);
              console.log(result);
              handleCloseClearDialog();
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Settings</title>
      </Head>
      <CollectionClearDialog />
      <ManualCrawlDialog />
      <Typography variant="h3" className="flex-1">
        <span className="font-bold">Settings</span>
      </Typography>
      <Divider />
      <Box className="my-3">
        <Typography variant="h5">
          <span className="font-bold">Common</span>
        </Typography>
        <Box className="my-3 flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              <span className="font-pretend">Dark Mode</span>
            </Typography>
            <Switch
              disabled
              checked={isDarkMode}
              onChange={(event) => {
                setIsDarkMode(event.target.checked);
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              <span className="font-pretend">Manual Crawl</span>
            </Typography>
            <Button onClick={() => setIsManualClearDialogOpen(true)}>
              <span className="font-pretend">Crawl</span>
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              <span className="font-pretend">Clear Collection</span>
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="collection-select-label">Collection</InputLabel>
                <Select
                  labelId="collection-select-label"
                  label="Collection"
                  value={targetCollection}
                  onChange={(event) => {
                    setTargetCollection(event.target.value);
                  }}
                >
                  {data?.collections.map((collection: string) => (
                    <MenuItem
                      key={collection}
                      value={collection}
                      onClick={() => {
                        setTargetCollection(collection);
                      }}
                    >
                      {collection}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button onClick={() => setIsClearDialogOpen(true)}>
              <span className="font-pretend">Clear</span>
            </Button>
          </div>
        </Box>
        <Divider className="my-3" />

        <Typography variant="h5">
          <span className="font-bold">Gallery</span>
        </Typography>
        <Box className="my-3">
          <div className="flex flex-row items-center">
            <Typography variant="body1" className="flex-1">
              <span className="font-pretend">Show Thumbnail</span>
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
              <span className="font-pretend">Column Count</span>
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
