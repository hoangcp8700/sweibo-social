import React from "react";
import { Box, IconButton } from "@mui/material";
import { icons } from "constants";

const ToggleSidebar = (props) => {
  const { handleToggleSidebar, isShowSidebar } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          position: "fixed",
          top: (theme) => `calc(${theme.sizes.header}px + 10px)`,
          left: !isShowSidebar ? 0 : `-100%`,
          transition: "left .4s ease",
          zIndex: 2,
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }),
      ]}
    >
      <IconButton
        onClick={handleToggleSidebar}
        sx={{
          opacity: isShowSidebar ? 0 : 0.5,
          cursor: isShowSidebar ? "context-menu" : "pointer",
          pointerEvents: isShowSidebar ? "none" : "",
          transition: "all .3s ease",
          bgcolor: "primary.main",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          "& svg": {
            fontSize: 18,
            fill: (theme) => theme.palette.common.white,
          },
          "&:hover": {
            opacity: isShowSidebar ? 0 : 1,
            bgcolor: "primary.main",
          },
        }}
      >
        {icons.ArrowRightIcon}
      </IconButton>
    </Box>
  );
};

export default ToggleSidebar;
