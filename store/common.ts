import { atom } from "recoil";
import { ItemProps } from "../components/simple/api";

// const apiUrl = "https://applemint-go-2gyldlncea-an.a.run.app";
const apiUrl = "http://localhost:8080";

const drawerState = atom({
  key: "drawerState",
  default: false,
});

const filterListState = atom({
  key: "filterListState",
  default: [] as string[],
});

const raindropCollectionListState = atom({
  key: "raindropCollectionListState",
  default: [] as { id: string; title: string }[],
});

const raindropModalOpenState = atom({
  key: "raindropModalOpenState",
  default: false,
});

const raindropItemState = atom({
  key: "raindropItemState",
  default: {} as ItemProps,
});

export {
  drawerState,
  filterListState,
  raindropCollectionListState,
  raindropModalOpenState,
  raindropItemState,
  apiUrl,
};
