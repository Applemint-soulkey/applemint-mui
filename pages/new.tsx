import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { NextPage } from "next";
import Head from "next/head";

const ItemCard: NextPage = () => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h4">
            <span className="font-semibold">Text Content</span>
          </Typography>
          <Typography variant="body1">
            <span>Urls</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex">
        <div className="flex-1">
          <Chip label="battlepage" />
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

const New: NextPage = () => {
  return (
    <div className="container flex flex-col p-10">
      <Head>
        <title>New</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1 font-extrabold">
          New
        </Typography>
        <div id="info_breadcumb" className="">
          <Typography variant="h6">
            Items:{" "}
            <span id="item_count" className="font-bold">
              0
            </span>
          </Typography>
        </div>
      </div>
      <Divider />
      <div id="item_container" className="mt-5 flex flex-col gap-5">
        {[...Array(10)].map((_, i) => (
          <ItemCard key={i} />
        ))}
        <ItemCard />
      </div>
    </div>
  );
};

export default New;
