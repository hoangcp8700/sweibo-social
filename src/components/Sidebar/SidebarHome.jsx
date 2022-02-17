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
import { useAuth } from "hooks";

const MenuItemStyle = styled(MenuItem)(({ active, theme }) => ({
  gap: theme.spacing(1),
  padding: theme.spacing(2, 1),
  borderRadius: theme.sizes.base,
  backgroundColor:
    active === "true" ? theme.palette.background.opacity : "none",
  "&:hover": {
    backgroundColor: theme.palette.background.opacity,
  },
}));

const SidebarHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box>
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <MenuItemStyle
          onClick={() => navigate(`${PATH_PAGE.profile.link}/hoang.locchoc`)}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar?.url} />
          <Typography variant="subtitle2" sx={{ pl: 1 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
        </MenuItemStyle>

        {data.sidebarHome.map((item, index) => (
          <Typography
            key={`${item.label}-${index}`}
            component={Link}
            to={item.path}
          >
            <MenuItemStyle
              active={location.pathname === item.path ? "true" : "false"}
            >
              <ListItemIcon sx={{ "& svg": { fontSize: 28 } }}>
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
