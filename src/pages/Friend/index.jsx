import React from "react";
import { Box, Stack } from "@mui/material";

import { SidebarItem } from "components";
import { data } from "constants";
import { Outlet } from "react-router-dom";

const Friend = () => {
  return (
    <Box>
      <Stack direction="row" sx={{ gap: 3 }}>
        <Box
          sx={[
            {
              maxWidth: (theme) => theme.sizes.sidebar,
              minWidth: (theme) => theme.sizes.sidebar,
            },
            (theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
        >
          <SidebarItem title="Bạn bè" lists={data.sidebarFriend} />
        </Box>

        <Box
          sx={{
            flex: 1,
            pt: 3,
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Friend;
