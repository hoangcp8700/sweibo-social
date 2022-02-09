import React from "react";
import { MMenu } from "components/MUI";
import {
  MenuItem,
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import SwitchMode from "../SwitchMode";
import { useAuth } from "hooks";

const MenuHeader = (props) => {
  const { name, handleRedirectProfile, handleLogout } = props;
  const { user } = useAuth();

  return (
    <MMenu {...props}>
      <MenuItem sx={{ gap: 2 }} onClick={() => handleRedirectProfile(name)}>
        <Avatar src={user?.avatar?.url} />
        <Box>
          <Typography variant="subtitle2">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Xem trang thông tin cá nhân
          </Typography>
        </Box>
      </MenuItem>

      <Divider />

      <MenuItem sx={{ gap: 2 }}>
        <IconButton>{icons.Brightness4Icon} </IconButton>
        <Typography variant="subtitle2">Chế độ màn hình</Typography>
        <SwitchMode />
      </MenuItem>

      <MenuItem sx={{ gap: 2 }} onClick={handleLogout}>
        <IconButton>{icons.LogoutIcon} </IconButton>
        <Typography variant="subtitle2">Đăng xuất</Typography>
      </MenuItem>
    </MMenu>
  );
};

export default MenuHeader;
