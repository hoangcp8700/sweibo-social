import React from "react";
import { Stack, Typography } from "@mui/material";

const SidebarHeader = (props) => {
  const { title, children } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default SidebarHeader;
