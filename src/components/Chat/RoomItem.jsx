import React from "react";
import {
  Box,
  Stack,
  Badge,
  Avatar,
  Typography,
  IconButton,
  styled,
  Button,
} from "@mui/material";
import { icons } from "constants";
import { fToNow } from "utils/formatTime";
import { lineClampStyle } from "utils/lineClampStyle";
import { AvatarGroupChat } from "components";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const RoomItem = (props) => {
  const { item, active, handleGetRoomById } = props;
  return (
    <Box onClick={() => handleGetRoomById(item?._id)}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          transition: "background 150ms",
          p: 1,
          borderRadius: (theme) => theme.sizes.minBase / 2,
          cursor: "pointer",
          bgcolor: active ? "background.opacity" : "transparent",
          "&:hover": {
            bgcolor: "background.opacity",
          },
        }}
      >
        <AvatarGroupChat images={item?.participants} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ flex: 1, gap: 2 }}
        >
          <Stack>
            <Typography variant="subtitle2" sx={lineClampStyle(2)}>
              {item?.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption" sx={lineClampStyle(1)}>
                {item?.lastMessage}
              </Typography>
              <Typography variant="caption">•</Typography>
              <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                {item?.updatedAt && fToNow(item?.updatedAt)}
              </Typography>
            </Stack>
          </Stack>
          {/* CheckCircleOutlineIcon CheckCircleIcon */}
          <IconButton sx={{ "& svg": { fontSize: 18 } }}>
            {icons.CheckCircleOutlineIcon}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RoomItem;
