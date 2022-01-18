import React from "react";
import { Box, Stack } from "@mui/material";

import { SidebarItem, StickySidebar } from "components";
import { data } from "constants";
import { Outlet } from "react-router-dom";

const Friend = () => {
  return (
    <Box>
      <Stack direction="row" alignItems="flex-start">
        <StickySidebar
          containerStyle={[
            (theme) => ({
              maxWidth: (theme) => theme.sizes.sidebar,
              minWidth: (theme) => theme.sizes.sidebar,
              mt: 3,
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ pl: 3 }}
        >
          <SidebarItem title="Bạn bè" lists={data.sidebarFriend} />
        </StickySidebar>

        <Box
          sx={{
            flex: 1,
            mt: 3,
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Friend;
