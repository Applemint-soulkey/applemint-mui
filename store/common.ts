import { atom } from "recoil";
import { ItemProps } from "../components/api";

const apiUrl = "https://applemint-go-2gyldlncea-an.a.run.app";
// const apiUrl = "http://localhost:8080";

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

const ModalItemState = atom({
  key: "ModalItemState",
  default: {} as ItemProps,
});

const bookmarkModalOpenState = atom({
  key: "bookmarkModalOpenState",
  default: false,
});

const linkSnackbarOpenState = atom({
  key: "linkSnackbarOpenState",
  default: false,
});

const showThumbnailState = atom({
  key: "showThumbnailState",
  default: true,
});

const galleryColumnCountState = atom({
  key: "galleryColumnCountState",
  default: 3,
});

const isDarkModeState = atom({
  key: "isDarkModeState",
  default: false,
});

export {
  drawerState,
  filterListState,
  raindropCollectionListState,
  raindropModalOpenState,
  ModalItemState,
  bookmarkModalOpenState,
  linkSnackbarOpenState,
  apiUrl,
  showThumbnailState,
  galleryColumnCountState,
  isDarkModeState,
};
