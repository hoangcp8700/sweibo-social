import React from "react";
import { Typography, IconButton, Stack } from "@mui/material";

const MTextIcon = (props) => {
  const { label, children, startIcon, endIcon, iconProps, textProps } = props;
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {startIcon ? <IconButton {...iconProps}>{startIcon} </IconButton> : ""}
      {children ? children : <Typography {...textProps}>{label} </Typography>}
      {endIcon ? <IconButton {...iconProps}>{endIcon} </IconButton> : ""}
    </Stack>
  );
};

export default MTextIcon;
