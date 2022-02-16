import * as React from "react";
import { Box } from "@mui/material";
import "./LoadingEllipsis.css";

export default function LoadingEllipsis({ sx }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1500,
        ...sx,
      }}
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
}
