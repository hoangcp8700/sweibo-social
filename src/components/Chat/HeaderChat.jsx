import React from "react";
import {
  Stack,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AvatarGroupChat } from "components";
import { lineClampStyle } from "utils/lineClampStyle";
import { icons } from "constants";

const HeaderChat = (props) => {
  const {
    isSidebarLeft,
    handleToggleSidebar,
    room,
    handleGetParticipants,
    handleToggleAddMember,
    handleToggleSidebarLeft,
  } = props;
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1, height: 70 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {matchesSM ? (
            <IconButton
              onClick={handleToggleSidebarLeft}
              sx={{
                "& svg": {
                  fontSize: 18,
                  fill: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {icons.ArrowLeftIcon}
            </IconButton>
          ) : (
            ""
          )}
          <AvatarGroupChat images={room?.participants} />
          <Stack>
            <Typography variant="subtitle2" sx={lineClampStyle(1)}>
              {room?.title}
            </Typography>
            {room?.participants?.length ? (
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={handleGetParticipants}
              >
                Xem tất cả người tham gia
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </Stack>

        <Stack direction="row">
          <IconButton
            onClick={handleToggleAddMember}
            sx={{ "& svg": { fill: (theme) => theme.palette.primary.main } }}
          >
            {icons.GroupAddIcon}
          </IconButton>
          <IconButton
            onClick={handleToggleSidebar}
            sx={{ "& svg": { fill: (theme) => theme.palette.primary.main } }}
          >
            {icons.InfoIcon}
          </IconButton>
        </Stack>
      </Stack>

      <Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default HeaderChat;
