import React from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";

import { Outlet } from "react-router-dom";

const MainAuthenticationLayout = () => {
  return (
    <Paper
      sx={{
        height: "100vh",
        overflow: "hidden",

        borderRadius: 0,
        background: `linear-gradient(90deg, rgba(167, 167, 255, 1) 0%, rgba(162, 186, 195, 1) 25%, rgba(91, 229, 132, 1) 50%, rgba(71, 195, 119, 1) 79%, rgba(0, 171, 85, 1) 100%)`,
      }}
    >
      <Paper
        sx={{
          ml: 10,
          mb: 10,
          boxShadow: `-12px 11px 29px -13px rgba(0,0,0,0.75)`,
          borderRadius: 0,
          borderBottomLeftRadius: 20,
        }}
      >
        <Stack
          alignItems="center"
          sx={{
            gap: 2,
            minHeight: "calc(100vh - 80px)",
            flexDirection: "row",
            maxWidth: (theme) => theme.breakpoints.values.lg,
            m: "0 auto",
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h1" color="primary">
              weibo
            </Typography>
            <Typography variant="h4">
              Weibo giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ maxWidth: 500, width: "100%", m: "0 auto" }}>
              <Outlet />
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default MainAuthenticationLayout;
