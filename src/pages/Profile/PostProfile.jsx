import React from "react";
import { InfomationUser, CreatePost, PostItem } from "components";
import { Box, Stack } from "@mui/material";

const PostProfile = () => {
  return (
    <Box>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <Stack>
          <InfomationUser />
        </Stack>

        <Stack spacing={2}>
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
