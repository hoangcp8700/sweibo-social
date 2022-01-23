import React from "react";
import { Box, Stack, IconButton, Typography } from "@mui/material";
import { icons } from "constants";

const SidebarHeader = (props) => {
  const {
    title,
    isBack = true,
    isShowSidebar,
    handleToggleSidebar,
    children,
  } = props;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {isBack ? (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: -26,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handleToggleSidebar}
            sx={{
              opacity: isShowSidebar ? 0 : 0.5,
              transition: "all .15s ease",
              bgcolor: "primary.main",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              "& svg": {
                fontSize: 18,
                fill: (theme) => theme.palette.common.white,
              },
              "&:hover": {
                opacity: 1,
                bgcolor: "primary.main",
              },
            }}
          >
            {icons.ArrowRightIcon}
          </IconButton>
        </Box>
      ) : (
        ""
      )}

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
