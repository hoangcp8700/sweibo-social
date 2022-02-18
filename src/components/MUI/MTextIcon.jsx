import React from "react";
import { Typography, IconButton, Stack } from "@mui/material";

const MTextIcon = (props) => {
  const {
    label,
    children,
    startIcon,
    endIcon,
    iconProps,
    textProps,
    containerStyle,
    onClick,
  } = props;
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      onClick={onClick}
      sx={containerStyle}
    >
      {startIcon ? <IconButton {...iconProps}>{startIcon} </IconButton> : ""}
      {children ? children : <Typography {...textProps}>{label} </Typography>}
      {endIcon ? <IconButton {...iconProps}>{endIcon} </IconButton> : ""}
    </Stack>
  );
};

export default MTextIcon;
