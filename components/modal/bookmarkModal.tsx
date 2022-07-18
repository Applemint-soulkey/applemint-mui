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
import { getBookmarkListCall, ItemProps, sendToBookmarkCall } from "../api";

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
  const OriginTextContent = itemData.text_content;
  const [textContent, setTextContent] = useState(OriginTextContent);

  // Set Query for Bookmark List
  const { data } = useQuery("bookmark_list", getBookmarkListCall, {});
  const list = data?.map((item: { id: string; Path: string }) => {
    return item.Path;
  });

  // Set Query for Bookmark Action
  const bookmarkMutation = useMutation(
    () => {
      let bookmarkItem: ItemProps = structuredClone(itemData);
      bookmarkItem.text_content = textContent;
      return sendToBookmarkCall(bookmarkItem, bookmarkPath, collection_origin);
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
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setTextContent(event.target.value);
    } else {
      setTextContent(OriginTextContent);
    }
  };

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
            <Box className="flex flex-col gap-3 sm:w-96 pt-2">
              <TextField
                className="w-fill"
                label="Title"
                defaultValue={itemData.text_content}
                onChange={handleTextChange}
              />
              <TextField
                className="w-fill"
                label="URL"
                disabled
                value={itemData.url}
              />
              <Autocomplete
                freeSolo
                className="w-fill"
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
