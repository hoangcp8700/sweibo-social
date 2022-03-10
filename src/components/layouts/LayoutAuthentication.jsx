import React from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Outlet } from "react-router-dom";

const MainAuthenticationLayout = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

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
          ml: { xs: 3, sm: 10 },
          mb: { xs: 3, sm: 10 },
          boxShadow: `-12px 11px 29px -13px rgba(0,0,0,0.75)`,
          borderRadius: 0,
          borderBottomLeftRadius: 20,
        }}
      >
        <Stack
          alignItems="center"
          sx={{
            gap: 5,
            px: { xs: 0, sm: 5 },
            minHeight: { xs: `calc(100vh - 24px)`, sm: `calc(100vh - 80px)` },
            flexDirection: "row",
            maxWidth: (theme) => theme.breakpoints.values.lg,
            m: "0 auto",
          }}
        >
          <Box sx={{ maxWidth: 500, display: { xs: "none", md: "block" } }}>
            <Typography variant="h1" color="primary">
              sweibo
            </Typography>
            <Typography variant="h4">
              Sweibo giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Paper
              elevation={!matches ? 4 : 0}
              sx={{
                maxWidth: 500,
                minWidth: { xs: 0, md: 400 },
                width: "100%",
                m: "0 auto",
              }}
            >
              <Outlet />
            </Paper>
          </Box>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default MainAuthenticationLayout;
