import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const New: NextPage = () => {
  return (
    <div className="container flex flex-col p-10">
      <Head>
        <title>New</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h4" className="flex-1 font-bold">
          New
        </Typography>
        <div id="info_breadcumb" className="">
          <Typography variant="h6">
            Items: <span className="font-bold">0</span>
          </Typography>
        </div>
      </div>
      <Divider />
      <div id="item_container">
        <Card>
          <CardContent>
            <CardHeader></CardHeader>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default New;
