import * as React from "react";
import {
  Dialog,
  DialogContent,
  Paper,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth, usePost } from "hooks";
import { icons } from "constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import {
  CommentItem,
  LoadingEllipsisElement,
  PopupMenu,
  ImageLightBox,
  PopupLikeOfPost,
  PopupShareOfPost,
  PopupCreatePost as PopupEditPost,
} from "components";

// components
import SlideImage from "./SlideImage";
import Header from "./Header";
import FooterInfo from "./FooterInfo";
import FooterActions from "./FooterActions";
import InputCreateComment from "./InputCreateComment";

const widthDefault = 380;

const menusFull = [
  {
    label: "Lưu",
    icon: icons.BookmarkBorderOutlinedIcon,
    value: "save-post",
  },
  { label: "Sửa", icon: icons.EditIcon, value: "edit-post" },
  {
    label: "Xóa bài viết",
    icon: icons.DeleteForeverIcon,
    value: "delete-post",
  },
];

const menus = [
  {
    label: "Lưu",
    icon: icons.BookmarkBorderOutlinedIcon,
    value: "save-post",
  },
];

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
};

export default function PopupDetailPost(props) {
  const {
    isAuth,
    open,
    postID,
    onClose,
    post,
    handleCommentLength,
    handleActionPost,
    handleSubmitEditPost,
  } = props;
  const { user } = useAuth();
  const {
    handleCreateComment,
    handleGetComments,
    handleSubmitEditComment,
    handleDeleteComment,
  } = usePost();

  const [form, setForm] = React.useState({ comment: "" });
  const [openMenu, setOpenMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize); // COMMENTS
  const [editCommentID, setEditCommentID] = React.useState(null);
  const [actionPost, setActionPost] = React.useState({
    name: "",
    postID: null,
  });

  const menuRef = React.useRef();

  const handleGetCommentsCustom = React.useCallback(async () => {
    if (!paginate.hasNextPage) return;
    setLoading(true);
    const response = await handleGetComments(paginate.page, postID);
    setLoading(false);

    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  }, [paginate, postID]);

  React.useEffect(() => {
    if (!open || !postID) return;
    handleGetCommentsCustom();
    return () => {
      setPaginate(initialize);
    };
  }, [open, postID]);

  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);

  const isLike = post?.likes?.length ? post?.likes?.includes(user?._id) : false;

  // -------------------- comment ---//

  const handleIsEditComment = (commentID) =>
    setEditCommentID(commentID || null);

  const handleSubmitComment = React.useCallback(async () => {
    if (!form.comment) return;
    if (submitting) return;
    setSubmitting(true);
    const response = await handleCreateComment(form.comment, postID);
    setSubmitting(false);
    if (response) {
      setPaginate({
        ...paginate,
        totalLength: paginate.totalLength + 1,
        data: [response, ...paginate.data],
      });
      setForm({ comment: "" });
      handleCommentLength(postID, true);
    }
  }, [form, paginate, postID]);

  const handleSubmitEditCommentCustom = async (content, commentID) => {
    const response = await handleSubmitEditComment(content, postID, commentID);
    const newPaginate = {
      ...paginate,

      data: paginate.data.map((item) => {
        if (item?._id !== commentID) return item;
        return response;
      }),
    };
    setPaginate(newPaginate);
    handleIsEditComment();
    return true;
  };

  const handleDeleteCommentCustom = async (commentID) => {
    await handleDeleteComment(postID, commentID);
    const newPaginate = {
      ...paginate,
      data: paginate.data.filter((item) => item?._id !== commentID),
    };
    setPaginate(newPaginate);
    handleCommentLength(postID, false);
    return true;
  };

  /// ---- actions --------------------------------
  const handleActionPostCustom = async (name, postID, post) => {
    setActionPost({ name, postID, post });
    if (name === "delete-post") {
      handleActionPost(name, postID);
    }
    if (postID) {
      handleToggleOpenMenu();
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: { bgcolor: "background.navbar", backgroundImage: "inherit" },
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <PopupMenu
          open={openMenu}
          onClose={handleToggleOpenMenu}
          onClick={(action) => handleActionPostCustom(action, postID, post)}
          ref={menuRef}
          lists={isAuth ? menusFull : menus}
        />

        {/* ---------------------  action post */}
        <PopupLikeOfPost
          open={(actionPost?.postID && actionPost.name === "like") || false}
          postID={actionPost?.postID}
          onClose={() => handleActionPostCustom("like", null)}
        />
        {/* // edit post */}
        <PopupEditPost
          open={
            (actionPost?.postID && actionPost.name === "edit-post") || false
          }
          onClose={() => handleActionPostCustom("edit-post", null)}
          postEdit={actionPost?.post}
          handleSubmitPost={handleSubmitEditPost}
        />

        <DialogContent
          sx={{
            p: 0,
          }}
        >
          {/* btn close */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  "& svg": {
                    fill: (theme) => theme.palette.common.white,
                    fontSize: 20,
                  },
                }}
              >
                {icons.CloseIcon}
              </IconButton>
            </Box>
          </Box>

          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              height: "100vh",
              bgcolor: "background.navbar",

              overflowY: "auto",
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                bgcolor: "background.opacity",
              },

              "&::-webkit-scrollbar": {
                width: 10,
                backgroundColor: "transparent",
              },

              "&::-webkit-scrollbar-thumb": {
                bgcolor: "grey.500",
                borderRadius: "10px",
              },
            }}
          >
            {/* // slide */}
            <SlideImage images={post?.images} />

            {/* content */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "auto", md: widthDefault },
                minWidth: { xs: "auto", md: widthDefault },
                py: 2,
                height: "100vh",
                width: "100%",
              }}
            >
              <Header
                ref={menuRef}
                post={post}
                handleToggleOpenMenu={handleToggleOpenMenu}
              />

              {/* content */}
              <Box sx={{ m: 2 }}>
                <Typography>{post?.content}</Typography>
              </Box>

              {/* footer info */}
              <FooterInfo
                likeLength={post?.likes?.length}
                commentLength={paginate?.totalLength}
                handleGetLikes={() => handleActionPostCustom("like", post?._id)}
                handleGetComments={() => {}}
              />

              {/* action footer */}
              <FooterActions
                isLike={isLike}
                handleLikePost={() => handleActionPost("like-post", post?._id)}
                handleGetComments={() => {}}
              />

              {/* // comments */}
              <Box sx={{ px: 2 }}>
                <Divider />

                {loading ? (
                  <Box
                    sx={{
                      "& .lds-ellipsis": {
                        width: 30,
                        height: 30,
                        pr: 9,
                        "& div": { width: 8, height: 8, top: 15 },
                      },
                    }}
                  >
                    <LoadingEllipsisElement />
                  </Box>
                ) : paginate?.hasNextPage ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      onClick={handleGetCommentsCustom}
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Xem thêm bình luận
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}

                <Stack
                  sx={{ pt: 2, pb: 8, flexDirection: "column-reverse", gap: 2 }}
                >
                  {paginate?.data?.length
                    ? paginate?.data.map((item) => (
                        <CommentItem
                          key={item._id}
                          item={item}
                          user={user}
                          editCommentID={item?._id === editCommentID}
                          handleIsEditComment={handleIsEditComment}
                          handleSubmitEditComment={
                            handleSubmitEditCommentCustom
                          }
                          handleDeleteComment={handleDeleteCommentCustom}
                          // handleGetCommentChildren={handleGetCommentChildren}
                        >
                          {/* {item?.replies?.length
                            ? item.replies.map((itemChild) => (
                                <CommentItemChildren
                                  key={itemChild._id}
                                  item={itemChild}
                                />
                              ))
                            : ""} */}
                        </CommentItem>
                      ))
                    : ""}
                </Stack>
              </Box>

              {/* // input create comment */}
              <InputCreateComment
                submitting={submitting}
                widthDefault={widthDefault}
                form={form}
                user={user}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSubmitComment(postID)
                }
                onChangeForm={(name, value) =>
                  setForm({ ...form, [name]: value })
                }
              />
            </Box>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
