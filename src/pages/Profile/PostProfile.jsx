import React from "react";
import {
  InfomationUser,
  AlbumFriends,
  AlbumImage,
  InputCreatePost,
  PostItem,
} from "components";
import { Box, Stack } from "@mui/material";
import { usePost } from "hooks";

const PostProfile = () => {
  const { handleCreatePost } = usePost();
  const [isCreate, setIsCreate] = React.useState(false);
  const handleToggleIsCreate = () => setIsCreate(!isCreate);

  const handleSubmitPost = async (form) => {
    try {
      const response = await handleCreatePost(form);
      console.log("handleSubmitPost", response);
    } catch (error) {
      console.log("err", error);
    }
  };

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
          <InputCreatePost
            open={isCreate}
            onClick={handleToggleIsCreate}
            handleSubmitPost={handleSubmitPost}
          />

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
