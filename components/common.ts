import { createTheme } from "@mui/material";
import { SetterOrUpdater } from "recoil";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#00bcd4",
    },
  },
  components: {
    MuiListItemIcon: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          variant: "h6",
          fontFamily: "Pretendard",
          fontWeight: "800",
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        variant: "temporary",
        anchor: "left",
        open: false,
        ModalProps: {
          keepMounted: true,
        },
      },
    },
  },
});

export const toggleDrawer =
  (open: boolean, setDrawerOpen: SetterOrUpdater<boolean>) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!open);
  };
