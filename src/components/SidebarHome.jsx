import React from "react";
import {
  Avatar,
  MenuList,
  ListItemIcon,
  MenuItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/styles";
import { icons } from "constants";
import { data } from "constants";

const MenuItemStyle = styled(MenuItem)(({ active, theme }) => ({
  gap: theme.spacing(2),
  padding: theme.spacing(2, 1),
  borderRadius: theme.sizes.base,
  backgroundColor: active ? theme.palette.background.opacity : "none",
  "&:hover": {
    backgroundColor: theme.palette.background.opacity,
  },
}));

const SidebarHome = () => {
  const location = useLocation();

  console.log("location.pathname ", location.pathname);
  return (
    <Box>
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <MenuItemStyle>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle2">Hoang Cong Phan </Typography>
        </MenuItemStyle>

        {data.sidebarHome.map((item) => (
          <Typography key={item.label} component={Link} to={item.path}>
            <MenuItemStyle active={location.pathname === item.path}>
              <ListItemIcon sx={{ "& svg": { fontSize: 32 } }}>
                {item.icon}
              </ListItemIcon>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {item?.title}{" "}
              </Typography>
            </MenuItemStyle>
          </Typography>
        ))}
      </MenuList>
    </Box>
  );
};

export default SidebarHome;
