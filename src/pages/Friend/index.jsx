import React from "react";
import { Box, Stack } from "@mui/material";

import { SidebarHeader, SidebarList, StickySidebar } from "components";
import { data } from "constants";
import { Outlet } from "react-router-dom";

const Friend = () => {
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

  const handleToggleSidebarLeft = React.useCallback(
    () => setIsSidebarLeft(!isSidebarLeft),
    [isSidebarLeft]
  );

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="flex-start"
        sx={{ overflowX: "hidden" }}
      >
        <StickySidebar
          sx={{
            transition: "all 0.6s ease",
            transform: isSidebarLeft
              ? `translate3d(0px, 0px, 0px)`
              : `translate3d(-100%, 0px, 0px)`,
          }}
          isShowSidebar={isSidebarLeft}
          containerStyle={[
            (theme) => ({
              maxWidth: (theme) => theme.sizes.sidebar,
              minWidth: (theme) => theme.sizes.sidebar,

              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ pl: 3, pr: 1, py: 2 }}
        >
          <SidebarHeader
            title="Bạn bè"
            isShowSidebar={isSidebarLeft}
            handleToggleSidebar={handleToggleSidebarLeft}
          />
          <SidebarList lists={data.sidebarFriend} />
        </StickySidebar>

        <Box
          sx={[
            (theme) => ({
              flex: 1,
              p: 3,
              transition: "all 0.5s ease 0s",
              transform: !isSidebarLeft
                ? `translateX(-350px)`
                : `translateX(0)`,
              minWidth: !isSidebarLeft ? `100%` : `inherit`,
              [theme.breakpoints.down("md")]: {
                transform: `translateX(0)`,
              },
            }),
          ]}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Friend;
