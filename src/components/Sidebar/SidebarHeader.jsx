import React from "react";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import { icons } from "constants";

const SidebarHeader = (props) => {
  const { title, isBack = true, handleToggleSidebar, children } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        {isBack ? (
          <IconButton
            onClick={handleToggleSidebar}
            sx={{
              "& svg": {
                fontSize: 18,
                fill: (theme) => theme.palette.text.primary,
              },
            }}
          >
            {icons.ArrowLeftIcon}
          </IconButton>
        ) : (
          ""
        )}

        <Typography variant="h6" sx={{ color: "text.primary" }}>
          {title}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
};

export default SidebarHeader;
