import React from "react";
import { ListItemIcon, Avatar, MenuItem, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/styles";

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
  const { item, location } = props;

  return (
    <Box>
      <Typography key={item.label} component={Link} to={item.path}>
        <MenuItemStyle active={location?.pathname === item.path}>
          {item?.thumbnail ? (
            <Avatar src={item?.thumbnail} alt={item.title} />
          ) : (
            ""
          )}
          {item?.icon ? (
            <ListItemIcon sx={{ "& svg": { fontSize: 32 } }}>
              {item?.icon}
            </ListItemIcon>
          ) : (
            ""
          )}

          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            {item?.title}
          </Typography>
        </MenuItemStyle>
      </Typography>
    </Box>
  );
};

export default SidebarItem;
