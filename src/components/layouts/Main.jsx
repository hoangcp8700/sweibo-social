import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Paper } from "@mui/material";

const Main = () => {
  return (
    <div>
      <Header />
      <Paper
        sx={{
          minHeight: "100vh",
          bgcolor: "background.main",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Paper>
    </div>
  );
};

export default Main;
