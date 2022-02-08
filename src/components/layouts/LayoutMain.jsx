import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Paper, Box } from "@mui/material";

const Main = () => {
  return (
    <Box>
      <Header />

      <Paper
        sx={{
          minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
          bgcolor: "background.main",
          overflow: "hidden",
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            maxWidth: (theme) => theme.breakpoints.values.xl,
            m: "auto",
            height: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
            overflowY: "auto",
            overflowX: "hidden",
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
          }}
        >
          <Outlet />
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
