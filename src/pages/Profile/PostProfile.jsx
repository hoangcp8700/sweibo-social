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
import { InfiniteScroll } from "providers";

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  length: 0,
};
const PostProfile = () => {
  const { handleCreatePost, handleGetPostUser } = usePost();

  const [isCreate, setIsCreate] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize);
  const [openLightBox, setOpenLightBox] = React.useState({
    open: false,
    images: [],
  });

  const handleGetPost = async () => {
    if (!paginate.isNextPage) return;
    const response = await handleGetPostUser(paginate.page);
    console.log("get post", response);
    setPaginate({
      page: response.next,
      isNextPage: response.hasNextPage ? true : false,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  };
  console.log("pagiante", paginate);

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
          {paginate?.totalLength > 0 ? (
            <InfiniteScroll
              isNextPage={paginate?.isNextPage}
              data={paginate?.data}
              fetch={handleGetPost}
              handleRefresh={() => console.log("refreshh")}
              endMessage={`Tổng cộng ${paginate?.totalLength} bài viết`}
            >
              {paginate?.data?.map((post) => (
                <PostItem
                  key={post._id}
                  post={post}
                  handleLightBox={(lists) => handleToggleOpenLightBox(lists)}
                  containerStyle={{ mt: 2 }}
                />
              ))}
            </InfiniteScroll>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostProfile;
