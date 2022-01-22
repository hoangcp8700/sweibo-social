import React from "react";
import { MMenu } from "components/MUI";
import { MenuItem, Typography, IconButton } from "@mui/material";
import { icons } from "constants";

const MenuItemCustom = ({ icon, iconStyle, label }) => {
  return (
    <MenuItem sx={{ gap: 1, height: 35 }}>
      <IconButton
        sx={{
          "& svg": {
            fontSize: 18,
            fill: (theme) => theme.palette.text.primary,
            ...iconStyle,
          },
        }}
      >
        {icon}
      </IconButton>
      <Typography variant="subtitle2">{label}</Typography>
    </MenuItem>
  );
};
const MenuDotMessageItem = (props) => {
  const { name, ...restProps } = props;
  return (
    <MMenu {...props}>
      <MenuItemCustom icon={icons.DeleteIcon} label="Xóa tin nhắn" />
      <MenuItemCustom
        icon={icons.PinIcon}
        label="Ghim"
        iconStyle={{ transform: `rotate(45deg)` }}
      />
    </MMenu>
  );
};

export default MenuDotMessageItem;
