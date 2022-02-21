import React from "react";
import { Box, Stack, IconButton, Divider, Typography } from "@mui/material";
import { icons } from "constants";
import {
  ActivityStatus,
  MessageItem,
  InputCreateMessage,
  AvatarGroupChat,
} from "components";
import { lineClampStyle } from "utils/lineClampStyle";

const BoxChat = (props) => {
  const { room, user, paginateMessage, handleToggleSidebar } = props;

  return (
    <Box>
      <Box
        sx={{
          maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px - 125px)`,
          minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px - 125px)`,
          overflowY: "auto",
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
        <Stack spacing={1} sx={{ p: 1 }}>
          {paginateMessage?.totalLength > 0
            ? paginateMessage?.data?.map((item) => (
                <MessageItem
                  key={item?._id}
                  active={item?.sender?._id === user?._id || false}
                  item={item}
                />
              ))
            : ""}
        </Stack>
      </Box>

      <Box sx={{ p: 1 }}>
        <InputCreateMessage />
      </Box>
    </Box>
  );
};

export default BoxChat;
