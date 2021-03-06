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

const MenuHeaderNotification = (props) => {
  const { name, handleDarkMode, ...restProps } = props;
  return (
    <MMenu {...props}>
      <MenuItem sx={{ gap: 2 }}>
        <Avatar />
        <Box>
          <Typography variant="subtitle2">Hoang Cong Phan</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Xem trang thông tin cá nhân
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem sx={{ gap: 2 }}>
        <Avatar />
        <Box>
          <Typography variant="subtitle2">Hoang Cong Phan</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Xem trang thông tin cá nhân
          </Typography>
        </Box>
      </MenuItem>
    </MMenu>
  );
};

export default MenuHeaderNotification;
