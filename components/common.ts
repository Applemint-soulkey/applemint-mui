import { createTheme, responsiveFontSizes } from "@mui/material";
import { SetterOrUpdater } from "recoil";

let theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Pretendard",
      },
    },
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
    MuiListSubheader: {
      defaultProps: {
        style: {
          backgroundColor: "#00bcd4",
          fontFamily: "Pretendard",
          fontWeight: "800",
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        variant: "persistent",
        anchor: "left",
        open: false,
        ModalProps: {
          keepMounted: true,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const toggleDrawer =
  (open: boolean, setDrawerOpen: SetterOrUpdater<boolean>) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!open);
  };

export { theme, toggleDrawer };
