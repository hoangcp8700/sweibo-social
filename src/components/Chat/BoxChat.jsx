import React from "react";
import { Box, Stack } from "@mui/material";
import { MessageItem } from "components";
import { fGetTime } from "utils/formatTime";

let userBefore;

const BoxChat = React.forwardRef((props, ref) => {
  const { children, handleActions, onScroll, user, paginateMessage } = props;

  return (
    <Box
      onScroll={onScroll}
      ref={ref}
      sx={{
        maxHeight: (theme) => ({
          xs: `calc(100vh - ${
            theme.sizes.header + theme.sizes.sidebarBottom
          }px - 125px)`,
          sm2: `calc(100vh - ${theme.sizes.header}px - 125px)`,
        }),
        minHeight: (theme) => ({
          xs: `calc(100vh - ${
            theme.sizes.header + theme.sizes.sidebarBottom
          }px - 125px)`,
          sm2: `calc(100vh - ${theme.sizes.header}px - 125px)`,
        }),
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar-track": {
          // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
          borderRadius: "10px",
          bgcolor: (theme) => theme.palette.background.opacity,
        },

        "&::-webkit-scrollbar": {
          width: 15,
          backgroundColor: "transparent",
        },

        "&::-webkit-scrollbar-thumb": {
          bgcolor: (theme) => theme.palette.grey[500],
          borderRadius: "10px",
        },
      }}
    >
      {children}
      <Stack sx={{ p: 1, gap: 1, flexDirection: "column-reverse" }}>
        {paginateMessage?.totalLength > 0
          ? paginateMessage?.data?.map((item, index) => {
              userBefore = paginateMessage.data[index - 1];
              let isGroup;
              if (
                item.sender._id === userBefore?.sender?._id &&
                !item.isNotification &&
                !userBefore?.isNotification
              ) {
                isGroup = true;
              } else {
                isGroup = false;
              }

              return (
                <MessageItem
                  key={item?._id}
                  active={item?.sender?._id === user?._id || false}
                  item={item}
                  isGroup={isGroup}
                  isNotification={item?.isNotification}
                  handleActions={handleActions}
                />
              );
            })
          : ""}
      </Stack>
    </Box>
  );
});

export default BoxChat;
