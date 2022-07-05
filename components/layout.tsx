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
import Head from "next/head";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import { SideMenu } from "./sidemenu";
import { useRecoilState } from "recoil";
import { drawerState, isDarkModeState } from "../store/common";
import { theme, toggleDrawer } from "./common";
import Link from "next/link";

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
                onClick={toggleDrawer(drawerOpen, setDrawerOpen)}
              >
                <MenuIcon />
              </IconButton>
              <Link href={"/"}>
                <Typography className="font-black cursor-pointer" variant="h5">
                  Applemint
                </Typography>
              </Link>
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
