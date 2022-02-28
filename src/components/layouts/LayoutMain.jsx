import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";

import SidebarHomeBottom from "../Sidebar/SidebarHomeBottom";

const Main = () => {
  const theme = useTheme();
  const matches700 = useMediaQuery(theme.breakpoints.down("700"));
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
      {matches700 ? (
        <>
          <Box sx={{ height: (theme) => theme.sizes.sidebarBottom }} />
          <SidebarHomeBottom />
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Main;
