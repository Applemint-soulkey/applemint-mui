import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";

import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { drawerState } from "../store/common";

export const SideMenu: NextPage = () => {
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
    <SwipeableDrawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(true)}
      onOpen={toggleDrawer(false)}
    >
      <Box className="w-60" onClick={toggleDrawer(drawerOpen)}>
        <List>
          <ListSubheader className="sm:my-2 my-1">
            <Typography
              className="font-pretend font-extrabold text-black"
              variant="h5"
            >
              Applemint
            </Typography>
          </ListSubheader>
        </List>

        <Divider />
        <List>
          {/* New */}
          <ListItemButton>
            <ListItemIcon>
              <FiberNewIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItem key={"New"} disablePadding>
              <ListItemText primary={"New"} />
            </ListItem>
          </ListItemButton>

          {/* Keep */}
          <ListItemButton>
            <ListItemIcon>
              <FlagIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItem key={"Keep"} disablePadding>
              <ListItemText primary={"Keep"} />
            </ListItem>
          </ListItemButton>

          {/* Bookmark */}
          <ListItemButton>
            <ListItemIcon>
              <BookmarksIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItem key={"Bookmark"} disablePadding>
              <ListItemText primary={"Bookmark"} />
            </ListItem>
          </ListItemButton>

          {/* Settings */}
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItem key={"Settings"} disablePadding>
              <ListItemText primary={"Settings"} />
            </ListItem>
          </ListItemButton>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};
