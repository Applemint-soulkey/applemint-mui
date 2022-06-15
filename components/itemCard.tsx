import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { NextPage } from "next";
import Link from "next/link";
import { deleteCall, ItemProps, keepCall } from "./api";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import {
  raindropModalOpenState,
  bookmarkModalOpenState,
  ModalItemState,
} from "../store/common";

const ItemCard: NextPage<{ itemData: ItemProps; collectionName: string }> = ({
  itemData,
  collectionName,
}) => {
  const setRaindropModalOpen = useSetRecoilState(raindropModalOpenState);
  const setBookmarkModalOpen = useSetRecoilState(bookmarkModalOpenState);
  const setModalItemData = useSetRecoilState(ModalItemState);
  const queryClient = useQueryClient();
  const sendToRaindropDialog = (item: ItemProps) => {
    setModalItemData(item);
    setRaindropModalOpen(true);
  };

  const sendToBookmarkDialog = (item: ItemProps) => {
    setModalItemData(item);
    setBookmarkModalOpen(true);
  };

  const deleteMutation = useMutation(
    () => deleteCall(itemData, collectionName),
    {
      onMutate: async () => await handleOnMutate(queryClient, collectionName),
      onSuccess: () => handleOnSuccess(queryClient, collectionName),
      onError: (err) => handleOnError(queryClient, collectionName, err),
      onSettled: () => handleOnSuccess(queryClient, collectionName),
    }
  );

  const keepMutation = useMutation(() => keepCall(itemData, collectionName), {
    onMutate: async () => await handleOnMutate(queryClient, collectionName),
    onSuccess: () => handleOnSuccess(queryClient, collectionName),
    onError: (err) => handleOnError(queryClient, collectionName, err),
    onSettled: () => handleOnSuccess(queryClient, collectionName),
  });

  return (
    <Card>
      <Link href={itemData.url} passHref>
        <a target={`_blank`}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h4">
                <span className="font-semibold">
                  {itemData.text_content !== ""
                    ? itemData.text_content
                    : itemData.domain}
                </span>
              </Typography>
              <Typography variant="body1">
                <span>{itemData.url}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions className="flex">
        <div className="flex-1">
          <Chip label={itemData.domain} />
        </div>
        <IconButton onClick={() => deleteMutation.mutate()}>
          <DeleteIcon />
        </IconButton>
        {collectionName === "keep" || collectionName === "bookmark" ? (
          <></>
        ) : (
          <IconButton onClick={() => keepMutation.mutate()}>
            <FlagIcon />
          </IconButton>
        )}
        <IconButton onClick={() => sendToBookmarkDialog(itemData)}>
          <BookmarkIcon />
        </IconButton>
        <IconButton onClick={() => sendToRaindropDialog(itemData)}>
          <InvertColorsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const handleOnMutate = async (
  queryClient: QueryClient,
  collectionName: string
) => {
  await queryClient.cancelQueries(collectionName + "Items");
  const previouseItems = await queryClient.getQueryData(
    collectionName + "Items"
  );
  return { previouseItems };
};

const handleOnSuccess = (queryClient: QueryClient, collectionName: string) => {
  console.log("delete success");
  queryClient.invalidateQueries(collectionName + "Items");
  queryClient.invalidateQueries(collectionName + "Info");
};

const handleOnError = (
  queryClient: QueryClient,
  collectionName: string,
  err: unknown
) => {
  console.log("delete error => ", err);
  queryClient.invalidateQueries(collectionName + "Items");
  queryClient.invalidateQueries(collectionName + "Info");
  //TODO show Eror Message Popup
};

export default ItemCard;
