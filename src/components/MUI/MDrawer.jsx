import React from "react";
import { Drawer } from "@mui/material";

const MDrawer = (props) => {
  return (
    <Drawer
      {...props}
      PaperProps={{
        sx: {
          "&::-webkit-scrollbar-track": {
            // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            bgcolor: (theme) => theme.palette.background.opacity,
          },

          "&::-webkit-scrollbar": {
            width: 15,
            backgroundColor: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: (theme) => theme.palette.grey[500],
            borderRadius: "10px",
          },
        },
      }}
    />
  );
};

export default MDrawer;
