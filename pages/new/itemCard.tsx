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
import { NextPage } from "next";
import Link from "next/link";
import { ItemProps } from "./common";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { apiUrl } from "../../store/common";

const deleteCall = (item: ItemProps) => {
  return fetch(`${apiUrl}/item/new/${item.id}`, {
    method: "DELETE",
  });
};

const handleOnMutate = async (queryClient: QueryClient) => {
  await queryClient.cancelQueries("newItems");
  const previouseItems = await queryClient.getQueryData("newItems");
  return { previouseItems };
};

const handleOnSuccess = (queryClient: QueryClient) => {
  console.log("delete success");
  queryClient.invalidateQueries("newItems");
  queryClient.invalidateQueries("newInfo");
};

const handleOnError = (queryClient: QueryClient, err: unknown) => {
  console.log("delete error => ", err);
  queryClient.invalidateQueries("newItems");
  queryClient.invalidateQueries("newInfo");
  //TODO show Eror Message Popup
};

const ItemCard: NextPage<ItemProps> = (item: ItemProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteCall, {
    onMutate: async () => await handleOnMutate(queryClient),
    onSuccess: () => handleOnSuccess(queryClient),
    onError: (err) => handleOnError(queryClient, err),
    onSettled: () => handleOnSuccess(queryClient),
  });

  return (
    <Card>
      <Link href={item.url} passHref>
        <a target={`_blank`}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h4">
                <span className="font-semibold">
                  {item.text_content !== "" ? item.text_content : item.domain}
                </span>
              </Typography>
              <Typography variant="body1">
                <span>{item.url}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions className="flex">
        <div className="flex-1">
          <Chip label={item.domain} />
        </div>
        <IconButton onClick={() => deleteMutation.mutate(item)}>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <FlagIcon />
        </IconButton>
        <IconButton>
          <BookmarkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
