import React from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import {
  InfomationUser,
  AlbumFriends,
  AlbumImage,
  InputCreatePost,
  PostItem,
} from "components";
import { Box, Stack, Typography } from "@mui/material";
import { useAuth, usePost } from "hooks";
import { PATH_PAGE } from "constants/paths";
import {
  ImageLightBox,
  PopupLikeOfPost,
  PopupCommentOfPost,
  PopupShareOfPost,
  PopupDetailPost,
} from "components";
import { InfiniteScroll } from "providers";
import { useSnackbar } from "notistack";

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  length: 0,
};
const PostProfile = () => {
  const {
    handleCreatePost,
    handleGetPostUser,
    handleDeletePost,
    handleToggleLike,
  } = usePost();
  const { user } = useAuth();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [isCreate, setIsCreate] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize); // POST
  const [openLightBox, setOpenLightBox] = React.useState({
    open: false,
    images: [],
  });

  const [actionPost, setActionPost] = React.useState({
    detail: false,
    name: "",
    postID: null,
  });

  const parsed = queryString.parse(location?.search);
  const isAuth = parsed.email ? false : true;

  const handleGetPost = async () => {
    if (!paginate.isNextPage) return;
    const response = await handleGetPostUser(
      paginate.page,
      !isAuth ? parsed?.email : null
    );
    console.log("handleGetPost", response);
    setPaginate({
      page: response.next,
      isNextPage: response.hasNextPage ? true : false,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
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
      if (!response.error) {
        setPaginate({ ...paginate, data: [response, ...paginate.data] });
        handleToggleIsCreate();
        return true;
      }
      enqueueSnackbar(response.error.message, { variant: "warning" });
      return false;
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

  const handleActionPost = async (name, postID, post) => {
    console.log("handleActionPost", name);
    if (name === "detail") {
      if (!postID) return setActionPost({ name, postID, detail: false });
      const getPost = paginate?.data?.filter((item) => item?._id === postID);
      return setActionPost({ name, postID, post: getPost[0], detail: true });
    }
    if (name === "like-post") {
      if (!postID) return setActionPost({ ...actionPost, name, postID });
      const response = await handleToggleLike(postID);
      if (response) {
        let newPost;
        if (response.isLike) {
          newPost = paginate.data.map((item) => {
            if (item?._id !== postID) return item;
            return { ...item, likes: [user?._id, ...item.likes] };
          });
        } else {
          newPost = paginate.data.map((item) => {
            if (item?._id !== postID) return item;
            return {
              ...item,
              likes: item.likes.filter((itemLike) => itemLike !== user?._id),
            };
          });
        }
        const getNewPost = newPost.filter((item) => item?._id === postID);
        setPaginate({
          ...paginate,
          data: newPost,
        });
        return setActionPost({
          ...actionPost,
          name,
          postID,
          post: getNewPost[0],
        });
      }
      return;
    }

    if (name === "delete-post") {
      const response = await handleDeletePost(postID);
      if (response) {
        const newPosts = paginate?.data?.filter((item) => item?._id !== postID);
        setPaginate({
          ...paginate,
          data: newPosts,
        });
        return setActionPost({
          detail: false,
          name: "",
          postID: "",
        });
      }
      return;
    }

    setActionPost({
      ...actionPost,
      name,
      postID,
    });
  };
  const handleCommentLength = (postID, type) => {
    const newPost = paginate.data.map((item) => {
      if (item?._id !== postID) return item;
      return {
        ...item,
        commentCount: type ? item.commentCount + 1 : item.commentCount - 1,
      };
    });
    return setPaginate({
      ...paginate,
      data: newPost,
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* /// ------------------- other */}
      {openLightBox.open && openLightBox?.images?.length ? (
        <ImageLightBox
          open={openLightBox}
          onClose={() => handleToggleOpenLightBox()}
          images={openLightBox?.images}
        />
      ) : (
        ""
      )}
      {/* ---------------------  action post */}
      <PopupLikeOfPost
        open={actionPost?.postID && actionPost.name === "like"}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("like", null)}
      />
      <PopupDetailPost
        open={
          (actionPost?.postID && actionPost.name === "detail") ||
          actionPost.detail
        }
        postID={actionPost?.postID}
        post={actionPost?.post}
        onClose={() => handleActionPost("detail", null)}
        handleCommentLength={handleCommentLength}
        handleActionPost={handleActionPost}
        actionPost={actionPost}
      />
      <PopupCommentOfPost
        open={actionPost?.postID && actionPost.name === "comment"}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("comment", null)}
        handleCommentLength={handleCommentLength}
      />
      <PopupShareOfPost
        open={actionPost?.postID && actionPost.name === "share"}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("share", null)}
      />

      {/* // ------------------------------------- */}
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
          {isAuth ? (
            <InputCreatePost
              postEdit={
                actionPost?.postID && actionPost?.name === "edit-post"
                  ? actionPost?.post
                  : null
              }
              open={isCreate}
              onClick={handleToggleIsCreate}
              handleSubmitPost={handleSubmitPost}
            />
          ) : (
            ""
          )}

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
                  isLike={
                    post?.likes?.length
                      ? post?.likes?.includes(user?._id)
                      : false
                  }
                  handleActionPost={handleActionPost}
                  containerStyle={{ mt: 2 }}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ color: "text.secondary", my: 5 }}
            >
              Hiện chưa có bài viết nào!
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostProfile;
