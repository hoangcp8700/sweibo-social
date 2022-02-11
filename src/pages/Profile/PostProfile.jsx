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
import { ImageLightBox } from "components";

const PostProfile = () => {
  const { handleCreatePost, handleGetPostUser } = usePost();

  const [isCreate, setIsCreate] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [nextPage, setNextPage] = React.useState(1);
  const [openLightBox, setOpenLightBox] = React.useState({
    open: false,
    images: [],
  });

  const handleGetPost = async () => {
    const response = await handleGetPostUser(nextPage);
    if (response.hasNextPage) {
      setNextPage(response.next);
    }
    setPosts(response.data);
  };

  React.useEffect(() => {
    const getPost = async () => {
      handleGetPost();
    };
    getPost();
  }, []);

  const handleSubmitPost = async (form) => {
    try {
      const response = await handleCreatePost(form);
      console.log("handleSubmitPost", response);
    } catch (error) {
      console.log("err", error);
    }
  };

  // ----------------------- actions
  const handleToggleOpenLightBox = (lists) => {
    setOpenLightBox({
      open: !openLightBox.open,
      images: lists || [],
    });
  };

  const handleToggleIsCreate = () => setIsCreate(!isCreate);

  return (
    <Box sx={{ position: "relative" }}>
      {openLightBox.open && openLightBox?.images?.length ? (
        <ImageLightBox
          open={openLightBox}
          onClose={() => handleToggleOpenLightBox()}
          images={openLightBox?.images}
        />
      ) : (
        ""
      )}
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

          {posts.length
            ? posts.map((post) => (
                <PostItem
                  key={post._id}
                  post={post}
                  handleLightBox={(lists) => handleToggleOpenLightBox(lists)}
                />
              ))
            : ""}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostProfile;
