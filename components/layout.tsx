import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { SideMenu } from "./sidemenu";
import { useRecoilState } from "recoil";
import { drawerState } from "../store/common";

type AppLayoutProps = {
  children: React.ReactNode;
};

const theme = createTheme({
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

export default function Layout({ children }: AppLayoutProps) {
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!open);
  };
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className="mr-1"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="font-pretend font-black" variant="h5">
              Applemint
            </Typography>
          </Toolbar>
        </AppBar>
        <SideMenu />
        {children}
      </ThemeProvider>
    </div>
  );
}
