import React from "react";
import { MMenu } from "components/MUI";
import { MenuItem, Typography, IconButton } from "@mui/material";
import { icons } from "constants";
import { useAuth } from "hooks";

const MenuItemCustom = ({ icon, iconStyle, label, onClick }) => {
  return (
    <MenuItem sx={{ gap: 1, height: 35 }} onClick={onClick}>
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
  const { name, senderID, handleActions, ...restProps } = props;
  const { user } = useAuth();

  return (
    <MMenu {...props}>
      {user?._id === senderID ? (
        <MenuItemCustom
          icon={icons.DeleteIcon}
          label="Xóa tin nhắn"
          onClick={() => handleActions("delete-message")}
        />
      ) : (
        ""
      )}

      <MenuItemCustom
        icon={icons.PinIcon}
        label="Ghim"
        iconStyle={{ transform: `rotate(45deg)` }}
        onClick={() => handleActions("pin-message")}
      />
    </MMenu>
  );
};

export default MenuDotMessageItem;
