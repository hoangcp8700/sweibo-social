import React from "react";
import {
  InfomationUser,
  AlbumFriends,
  AlbumImage,
  CreatePost,
  PostItem,
} from "components";
import { Box, Stack } from "@mui/material";

const PostProfile = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 2,
        }}
        alignItems="flex-start"
      >
        <Stack
          spacing={2}
          sx={[
            (theme) => ({
              maxWidth: 430,
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
        >
          <InfomationUser />
          <AlbumImage />
          <AlbumFriends />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <CreatePost />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostProfile;
