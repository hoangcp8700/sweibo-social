import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Paper, Box } from "@mui/material";

const Main = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.xl,
          m: "auto",
          // height: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
