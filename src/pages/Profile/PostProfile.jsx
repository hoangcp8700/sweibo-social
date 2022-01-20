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
    <Box>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <Stack spacing={2} sx={{ maxWidth: 430 }}>
          <InfomationUser />
          <AlbumImage />
          <AlbumFriends />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <CreatePost />
          <PostItem />
          <PostItem />
          <PostItem />
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostProfile;
