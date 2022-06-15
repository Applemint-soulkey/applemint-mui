import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getBookmarkListCall,
  ItemProps,
  sendToBookmarkCall,
} from "./simple/api";

const BookmarkModal: NextPage<{
  bookmarkOpen: boolean;
  setBookmarkOpen: Dispatch<SetStateAction<boolean>>;
  itemData: ItemProps;
  collection_origin: string;
}> = ({ bookmarkOpen, setBookmarkOpen, itemData, collection_origin }) => {
  // Set Hooks for Bookmark Dialog
  const queryClient = useQueryClient();
  const [bookmarkPath, setBookmarkPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPathError, setPathError] = useState(false);

  // Set Query for Bookmark List
  const { data } = useQuery("bookmark_list", getBookmarkListCall, {});
  const list = data?.map((item: { id: string; Path: string }) => {
    return item.Path;
  });

  // Set Query for Bookmark Action
  const bookmarkMutation = useMutation(
    () => {
      return sendToBookmarkCall(itemData, bookmarkPath, collection_origin);
    },
    {
      onMutate: () => {
        setIsLoading(true);
        setBookmarkPath("");
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(collection_origin + "Items");
        handleClose();
      },
    }
  );

  // Handle the user input
  const handleClose = () => {
    setBookmarkOpen(false);
    setIsLoading(false);
    setPathError(false);
  };
  const handleSubmit = () => {
    console.log(bookmarkPath);
    if (bookmarkPath === "") {
      setPathError(true);
    } else {
      bookmarkMutation.mutate();
    }
  };

  return (
    <Dialog open={bookmarkOpen} onClose={handleClose}>
      <DialogTitle>Save to Bookmark</DialogTitle>
      {isLoading ? (
        <DialogContent className="flex justify-center">
          <CircularProgress />
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <Box className="flex flex-col gap-3 w-96 pt-2">
              <TextField label="Title" value={itemData.text_content} />
              <TextField label="URL" fullWidth disabled value={itemData.url} />
              <Autocomplete
                freeSolo
                options={list ? list : []}
                id="combo-box-bookmark"
                renderInput={(params) => (
                  <TextField
                    error={isPathError}
                    helperText={isPathError ? "Path is required" : ""}
                    {...params}
                    label="Bookmark Path"
                  />
                )}
                onInputChange={(event, value) => {
                  if (value === "") {
                    setPathError(false);
                  } else {
                    setBookmarkPath(value as string);
                  }
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default BookmarkModal;
