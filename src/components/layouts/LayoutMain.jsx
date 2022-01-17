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
          py: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: (theme) => theme.breakpoints.values.xl,
            m: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
