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
import { useMutation, useQueryClient } from "react-query";
import { apiUrl } from "../../store/common";

const ItemCard: NextPage<ItemProps> = (item: ItemProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (item: ItemProps) => {
      return fetch(`${apiUrl}/item/new/${item.id}`, {
        method: "DELETE",
      });
    },
    {
      onMutate: async (item: ItemProps) => {
        await queryClient.cancelQueries("newItems");
        const previouseItems = await queryClient.getQueryData("newItems");
        return { previouseItems };
      },
      onSuccess: async () => {
        console.log("delete success");
        queryClient.invalidateQueries("newItems");
        queryClient.invalidateQueries("newInfo");
      },
      onError: (err, item, context) => {
        console.log(err);
        queryClient.setQueryData("newItems", context?.previouseItems);
        //TODO show Eror Message Popup
      },
      onSettled: () => {
        console.log("delete settled");
        queryClient.invalidateQueries("newItems");
      },
    }
  );

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
