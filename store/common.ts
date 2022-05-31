import { atom } from "recoil";

const drawerState = atom({
  key: "drawerState",
  default: false,
});

export { drawerState };
