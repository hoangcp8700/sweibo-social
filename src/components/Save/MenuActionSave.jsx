import React from "react";
import { MMenu } from "components/MUI";
import { MenuItem, Typography, IconButton } from "@mui/material";
import { icons } from "constants";

const MenuActionSave = (props) => {
  return (
    <MMenu {...props}>
      <MenuItem sx={{ gap: 2 }}>
        <IconButton
          sx={{ "& svg": { fill: (theme) => theme.palette.text.primary } }}
        >
          {icons.EditIcon}{" "}
        </IconButton>
        <Typography variant="subtitle2">Đổi tên bộ sưu tập</Typography>
      </MenuItem>

      <MenuItem sx={{ gap: 2 }}>
        <IconButton
          sx={{ "& svg": { fill: (theme) => theme.palette.text.primary } }}
        >
          {icons.DeleteIcon}{" "}
        </IconButton>
        <Typography variant="subtitle2">Xóa bộ sưu tập</Typography>
      </MenuItem>
    </MMenu>
  );
};

export default MenuActionSave;
