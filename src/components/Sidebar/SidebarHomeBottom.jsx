import React from "react";
import {
  Avatar,
  MenuList,
  ListItemIcon,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/styles";

import { data } from "constants";
import { PATH_PAGE } from "constants/paths";
import { useAuth } from "hooks";

const MenuItemStyle = styled(MenuItem)(({ active, theme }) => ({
  gap: theme.spacing(1),
  height: "100%",
  padding: theme.spacing(2, 1),
  borderRadius: theme.sizes.base,
  justifyContent: "center",
  backgroundColor:
    active === "true" ? theme.palette.background.opacity : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.background.opacity,
  },
}));

const SidebarHomeBottom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("location", location);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: "red",
        height: (theme) => theme.sizes.sidebarBottom,
      }}
    >
      <Box sx={{ bgcolor: "background.navbar" }}>
        <MenuList
          sx={{ display: "flex", flexDirection: "row", p: 0, gap: 0.2 }}
        >
          {data.sidebarHome.map((item, index) => {
            const match = location.pathname === item.path;

            return (
              <Typography
                key={`${item.label}-${index}`}
                component={Link}
                to={item.path}
                sx={{ flex: 1 }}
              >
                <MenuItemStyle active={match ? "true" : "false"}>
                  <ListItemIcon
                    sx={{
                      "& svg": {
                        fontSize: 26,
                        fill: (theme) => theme.palette.text.primary,
                      },

                      minWidth: "26px!important",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.primary",
                      display: { xs: "none", mobile: "block" },
                    }}
                  >
                    {item?.title}{" "}
                  </Typography>
                </MenuItemStyle>
              </Typography>
            );
          })}
          <MenuItemStyle
            active={
              location.pathname.includes(`/${PATH_PAGE.profile.link}`) &&
              !location.search
                ? "true"
                : "false"
            }
            onClick={() => navigate(`/${PATH_PAGE.profile.link}/posts`)}
            sx={{ flex: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar?.url} />
          </MenuItemStyle>
        </MenuList>
      </Box>
    </Box>
  );
};

export default SidebarHomeBottom;
