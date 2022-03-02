import React from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import {
  InfomationUser,
  AlbumFriends,
  AlbumImage,
  InputCreatePost,
  PostItem,
  LoadingEllipsis,

  //posts
  ImageLightBox,
  PopupLikeOfPost,
  PopupCommentOfPost,
  PopupShareOfPost,
  PopupDetailPost,
  PopupCreatePost as PopupEditPost,
  PopupFollowers,
} from "components";
import { Box, Stack, Typography } from "@mui/material";
import { useAuth, usePost, useUser } from "hooks";
import { PATH_PAGE } from "constants/paths";

import { InfiniteScroll } from "providers";
import { useSnackbar } from "notistack";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
};

const PostProfile = () => {
  const {
    handleCreateOrEditPost,
    handleGetPostUser,
    handleDeletePost,
    handleToggleLike,
  } = usePost();
  const { user, handleUpdateAuth } = useAuth();
  const { handleSubmitEditProfile, userClient } = useUser();

  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [isCreate, setIsCreate] = React.useState(false);
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize); // POST
  const [openLightBox, setOpenLightBox] = React.useState({
    open: false,
    images: [],
  });
  const userProfile = userClient || user;

  const [actionPost, setActionPost] = React.useState({
    detail: false,
    name: "",
    postID: null,
  });

  const parsed = queryString.parse(location?.search);
  const isAuth = !parsed.email ? true : false;

  const handleGetPost = async () => {
    if (!paginate.hasNextPage) return;
    const response = await handleGetPostUser(
      paginate.page,
      !isAuth ? parsed?.email : null
    );
    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  React.useEffect(() => {
    handleGetPost();
    return () => setPaginate(initialize);
  }, [isAuth]);

  const handleSubmitPost = async (form) => {
    try {
      handleToggleIsLoading(true);
      const response = await handleCreateOrEditPost(form);
      handleToggleIsLoading(false);
      if (response.success) {
        // create post
        if (!form?._id) {
          setPaginate({
            ...paginate,
            data: [response.data, ...paginate.data],
            totalLength: paginate?.totalLength + 1,
          });
          handleToggleIsCreate();
        } else {
          const newPosts = paginate.data.map((item) => {
            if (item?._id !== form?._id) return item;
            return response.data;
          });
          setPaginate({
            ...paginate,
            data: newPosts,
          });

          if (actionPost?.detail) {
            setActionPost({ ...actionPost, post: response.data });
          }
        }
      }

      enqueueSnackbar(response.message || response.error.message, {
        variant: response?.success ? "success" : "warning",
      });

      return true;
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
  const handleToggleIsLoading = (value) => setIsLoading(value);
  const handleToggleShowFollowers = () => setOpenFollowers(!openFollowers);

  const handleActionPost = async (name, postID, post) => {
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
      handleToggleIsLoading(true);
      const response = await handleDeletePost(postID);
      handleToggleIsLoading(false);

      if (response) {
        const newPosts = paginate?.data?.filter((item) => item?._id !== postID);
        setPaginate({
          ...paginate,
          totalLength: paginate.totalLength - 1,
          data: newPosts,
        });
        enqueueSnackbar(response.message, { variant: "success" });

        return setActionPost({
          detail: false,
          name: "",
          postID: "",
        });
      }
      return;
    }

    if (name === "edit-post") {
      if (postID)
        return setActionPost({
          ...actionPost,
          name,
          postID,
          post,
        });
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

  const handleUpdateFollowersLength = () => {
    const newUser = { ...user, followers: user?.followers - 1 };
    console.log("handleUpdateFollowersLength", newUser);
    handleUpdateAuth(newUser);
  };

  const handleSubmitEditProfileCustom = async (form) => {
    const response = await handleSubmitEditProfile(userProfile?._id, form);
    if (response) {
      handleUpdateAuth({ ...userProfile, contact: response });
      enqueueSnackbar("Cập nhập thông tin cá nhân thành công", {
        variant: "success",
      });
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      {isLoading ? (
        <LoadingEllipsis sx={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      ) : (
        ""
      )}

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

      <PopupFollowers
        open={openFollowers}
        onClose={handleToggleShowFollowers}
        user={userProfile}
        handleUpdateFollowersLength={handleUpdateFollowersLength}
      />

      {/* ---------------------  action post */}
      <PopupLikeOfPost
        open={(actionPost?.postID && actionPost.name === "like") || false}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("like", null)}
      />
      <PopupDetailPost
        isAuth={actionPost?.post?.createdBy?._id === user?._id || false}
        open={
          (actionPost?.postID && actionPost.name === "detail") ||
          actionPost.detail ||
          false
        }
        postID={actionPost?.postID}
        post={actionPost?.post}
        onClose={() => handleActionPost("detail", null)}
        handleCommentLength={handleCommentLength}
        handleActionPost={handleActionPost}
        handleSubmitEditPost={handleSubmitPost}
      />
      <PopupCommentOfPost
        open={(actionPost?.postID && actionPost.name === "comment") || false}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("comment", null)}
        handleCommentLength={handleCommentLength}
      />
      <PopupShareOfPost
        open={(actionPost?.postID && actionPost.name === "share") || false}
        postID={actionPost?.postID}
        onClose={() => handleActionPost("share", null)}
      />

      {/* // edit post */}
      <PopupEditPost
        open={(actionPost?.postID && actionPost.name === "edit-post") || false}
        onClose={() => handleActionPost("edit-post", null)}
        postEdit={actionPost?.post}
        handleSubmitPost={handleSubmitPost}
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
              minWidth: { xs: "inherit", md: 430 },
              width: "100%",
              gap: 2,
            }),
          ]}
        >
          <InfomationUser
            isAuth={isAuth}
            user={userProfile}
            handleSubmitEditProfile={handleSubmitEditProfileCustom}
            handleToggleShowFollowers={handleToggleShowFollowers}
          />

          {/* <AlbumFriends /> */}
          {/* <AlbumImage /> */}
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
              open={isCreate}
              onClick={handleToggleIsCreate}
              handleSubmitPost={handleSubmitPost}
            />
          ) : (
            ""
          )}

          {paginate?.totalLength > 0 ? (
            <InfiniteScroll
              hasNextPage={paginate?.hasNextPage}
              data={paginate?.data}
              fetch={handleGetPost}
              handleRefresh={() => console.log("refreshh")}
              endMessage={`Tổng cộng ${paginate?.totalLength} bài viết`}
            >
              {paginate?.data?.map((post) => (
                <PostItem
                  isAuth={isAuth}
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
