import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Container,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { SideMenu } from "./sidemenu";
import { useRecoilState } from "recoil";
import { drawerState } from "../store/common";
import Head from "next/head";

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

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Layout(props: Props) {
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
    <div className="h-screen flex flex-col">
      <Head>
        <title>Applemint</title>
      </Head>
      <ThemeProvider theme={theme}>
        <HideOnScroll {...props}>
          <AppBar color="primary">
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
        </HideOnScroll>
        <Toolbar />
        <SideMenu />
        <Container>
          <Box className="my-2">
            <main className="flex justify-center">{props.children}</main>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
