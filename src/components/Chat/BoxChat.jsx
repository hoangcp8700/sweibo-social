import React from "react";
import { Box, Stack } from "@mui/material";
import { MessageItem } from "components";
import { fGetTime } from "utils/formatTime";

let dataBefore;
let isGroup = false;

const BoxChat = React.forwardRef((props, ref) => {
  const { children, onScroll, user, paginateMessage } = props;

  return (
    <Box
      onScroll={onScroll}
      ref={ref}
      sx={{
        maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px - 125px)`,
        minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px - 125px)`,
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
          ? paginateMessage?.data?.map((item) => {
              return (
                <MessageItem
                  key={item?._id}
                  active={item?.sender?._id === user?._id || false}
                  item={item}
                  isNotification={item?.isNotification}
                />
              );
            })
          : ""}
      </Stack>
    </Box>
  );
});

export default BoxChat;
