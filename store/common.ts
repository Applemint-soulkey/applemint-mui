import { atom } from "recoil";

// const apiUrl = "https://applemint-go-2gyldlncea-an.a.run.app";
const apiUrl = "http://localhost:8080";

const drawerState = atom({
  key: "drawerState",
  default: false,
});

export { drawerState, apiUrl };
