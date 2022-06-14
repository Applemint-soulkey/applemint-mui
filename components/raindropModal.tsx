import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import { raindropCollectionListState } from "../store/common";
import { ItemProps } from "./simple/common";

const RaindropModal: NextPage<{
  raindropOpen: boolean;
  setRaindropOpen: Dispatch<SetStateAction<boolean>>;
  data: ItemProps;
}> = ({ raindropOpen, setRaindropOpen, data }) => {
  const [collection, setCollection] = useState("");
  const raindropCollections = useRecoilValue(raindropCollectionListState);
  const handleCollectionChange = (event: { target: { value: string } }) => {
    setCollection(event.target.value as string);
  };

  return (
    <Dialog open={raindropOpen} onClose={() => setRaindropOpen(false)}>
      <DialogTitle>Save on Raindrop</DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-3 mt-3 w-96">
          <TextField label="Title" value={data.text_content} />
          <TextField label="URL" fullWidth disabled value={data.url} />
          <Select value={collection} onChange={handleCollectionChange}>
            {raindropCollections.map((collection) => (
              <MenuItem key={collection.id} value={collection.title}>
                {collection.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RaindropModal;
