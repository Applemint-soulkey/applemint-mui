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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { NextPage } from "next";
import Link from "next/link";
import { ItemProps } from "../new";

const ItemCard: NextPage<ItemProps> = (item: ItemProps) => {
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
        <IconButton>
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
