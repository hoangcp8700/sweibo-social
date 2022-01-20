import React from "react";
import { Typography, IconButton, Stack } from "@mui/material";

const MTextIcon = (props) => {
  const { children, startIcon, endIcon, iconProps, textProps } = props;
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {startIcon ? <IconButton {...iconProps}>{startIcon} </IconButton> : ""}
      <Typography {...textProps}>{children} </Typography>
      {endIcon ? <IconButton {...iconProps}>{endIcon} </IconButton> : ""}
    </Stack>
  );
};

export default MTextIcon;
