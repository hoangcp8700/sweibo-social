import * as React from "react";
import { AvatarGroup, Avatar, Stack } from "@mui/material";

export default function ImageGroupCreatePost() {
  return (
    <Stack
      sx={{
        mt: 2,
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <AvatarGroup
        max={4}
        variant="rounded"
        sx={{
          justifyContent: "flex-end",
          "& .MuiAvatar-root": {
            width: 100,
            height: 100,
          },
        }}
      >
        <Avatar
          variant="rounded"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Avatar
          variant="rounded"
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
        />
        <Avatar
          variant="rounded"
          alt="Cindy Baker"
          src="/static/images/avatar/3.jpg"
        />
        <Avatar
          variant="rounded"
          alt="Agnes Walker"
          src="/static/images/avatar/4.jpg"
        />
        <Avatar
          variant="rounded"
          alt="Trevor Henderson"
          src="/static/images/avatar/5.jpg"
        />
      </AvatarGroup>
    </Stack>
  );
}
