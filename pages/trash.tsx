import { Divider, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import ItemContainer from "../components/itemContainer";

const Trash: NextPage = () => {
  const collectionName = "trash";

  return (
    <div className="container flex flex-col p-3 sm:p-10">
      <Head>
        <title>Trash</title>
      </Head>
      <div id="info_container" className="flex items-end">
        <Typography variant="h3" className="flex-1 font-extrabold">
          Trash
        </Typography>
      </div>
      <Divider />
      <ItemContainer
        collectionName={collectionName}
        domainFilter=""
        pathFilter=""
      />
    </div>
  );
};

export default Trash;
