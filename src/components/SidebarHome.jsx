import React from "react";
import {
  Avatar,
  MenuList,
  ListItemIcon,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/styles";

import { data } from "constants";
import { PATH_PAGE } from "constants/paths";

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
  const navigate = useNavigate();

  return (
    <Box>
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <MenuItemStyle
          onClick={() => navigate(`${PATH_PAGE.profile.link}/hoang.locchoc`)}
        >
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
