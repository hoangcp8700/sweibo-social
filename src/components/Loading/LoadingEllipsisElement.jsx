import * as React from "react";
import { Box } from "@mui/material";
import "./LoadingEllipsis.css";

export default function LoadingEllipsis() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
