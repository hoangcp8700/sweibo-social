import React from "react";
import { Stack, Box, Typography, Divider, IconButton } from "@mui/material";
import { AvatarGroupChat } from "components";
import { lineClampStyle } from "utils/lineClampStyle";
import { icons } from "constants";

const HeaderChat = (props) => {
  const { handleToggleSidebar, room, handleGetParticipants } = props;
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
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={handleGetParticipants}
              >
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
    </Box>
  );
};

export default HeaderChat;
