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

const ActivityStatusItem = ({ item }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
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
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt={item?.name} src={item?.avatar} />
      </StyledBadge>

      <Typography variant="subtitle2" sx={{}}>
        {item?.name}{" "}
      </Typography>
    </Stack>
  );
};

const ActivityStatus = ({ lists }) => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Hoạt động
        </Typography>
        <IconButton>{icons.MoreHorizIcon}</IconButton>
      </Stack>

      <Stack spacing={1}>
        {lists?.map((item) => (
          <ActivityStatusItem key={item.id} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default ActivityStatus;
