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
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
        alignItems="flex-start"
      >
        <Stack
          sx={[
            (theme) => ({
              maxWidth: { xs: "inherit", sm: 430 },
              gap: 2,
            }),
          ]}
        >
          <InfomationUser />
          <AlbumImage />
          <AlbumFriends />
        </Stack>

        <Stack
          spacing={2}
          sx={{
            flex: 1,
            width: "100%",
            minWidth: { xs: "inherit", sm: 350, md: 320 },
          }}
        >
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
