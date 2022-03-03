import React from "react";
import {
  Box,
  Stack,
  Badge,
  Avatar,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";

const FriendSuggestionItem = ({ item }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        transition: "background 150ms",
        p: 1,
        borderRadius: (theme) => theme.sizes.minBase / 2,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "background.opacity",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={item?.name} src={item?.avatar} />

        <Typography variant="subtitle2" sx={lineClampStyle(1)}>
          {item?.name}{" "}
        </Typography>
      </Stack>
      <IconButton sx={{ "& svg": { fontSize: 22 } }}>
        {icons.PersonAddIcon}
      </IconButton>
    </Stack>
  );
};

const FriendSuggestion = ({ lists }) => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, mx: 1 }}
      >
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Gợi ý kết bạn
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            cursor: "pointer",
            color: "text.secondary",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Xem tất cả
        </Typography>
      </Stack>

      <Stack spacing={1}>
        {lists?.map((item) => (
          <FriendSuggestionItem key={item.id} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default FriendSuggestion;
