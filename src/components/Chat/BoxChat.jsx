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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1, height: 70 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <AvatarGroupChat images={room?.participants} />
          <Stack>
            <Typography variant="subtitle2" sx={lineClampStyle(1)}>
              {room?.title}
            </Typography>
            {room?.participants?.length > 1 ? (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {room?.participants?.length} người tham gia
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </Stack>

        <Box>
          <IconButton
            onClick={handleToggleSidebar}
            sx={{ "& svg": { fill: (theme) => theme.palette.primary.main } }}
          >
            {icons.InfoIcon}
          </IconButton>
        </Box>
      </Stack>

      <Box>
        <Divider />
      </Box>

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
        {/* <Stack spacing={1} sx={{ p: 1 }}>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
          <MessageItem>helllo 123</MessageItem>
          <MessageItem active={true}>
            img elements must have an alt prop, either with meaningful text, or
            an empty string for decorative images jsx-a11y/alt-text Line 60:1:
            Assign object to a variable before exporting as module default{" "}
          </MessageItem>
          <MessageItem active={true}>helllo 123</MessageItem>
        </Stack> */}
      </Box>

      <Box sx={{ p: 1 }}>
        <InputCreateMessage />
      </Box>
    </Box>
  );
};

export default BoxChat;
