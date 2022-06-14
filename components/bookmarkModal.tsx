import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { ItemProps } from "./simple/api";

const BookmarkModal: NextPage<{
  bookmarkOpen: boolean;
  setBookmarkOpen: Dispatch<SetStateAction<boolean>>;
  data: ItemProps;
}> = ({ bookmarkOpen, setBookmarkOpen, data }) => {
  const handleClose = () => setBookmarkOpen(false);

  return (
    <Dialog open={bookmarkOpen} onClose={handleClose}>
      <DialogTitle>Save to Bookmark</DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-3 w-96">
          <TextField label="Title" value={data.text_content} />
          <TextField label="URL" fullWidth disabled value={data.url} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkModal;
