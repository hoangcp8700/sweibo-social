import React from "react";
import {
  MenuList,
  ListItemIcon,
  MenuItem,
  Stack,
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
  backgroundColor: active ? theme.palette.background.opacity : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.background.opacity,
  },
}));

const SidebarItem = (props) => {
  const { title, lists, headerChildren } = props;
  const location = useLocation();

  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
        {headerChildren}
      </Stack>
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {lists?.map((item) => (
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

export default SidebarItem;
