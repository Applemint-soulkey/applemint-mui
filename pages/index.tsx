import type { NextPage } from "next";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { raindropCollectionListCall } from "../components/api";
import { raindropCollectionListState } from "../store/common";
import New from "./new";

const Home: NextPage = () => {
  const setRaindropCollections = useSetRecoilState(raindropCollectionListState);

  useQuery("raindropCollections", raindropCollectionListCall, {
    onSuccess: async (data) => {
      const json = await data.json();
      setRaindropCollections(json);
    },
  });

  return <New />;
};

export default Home;
