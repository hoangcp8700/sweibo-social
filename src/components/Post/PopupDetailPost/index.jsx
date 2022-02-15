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
  CommentItemChildren,
  LoadingEllipsisElement,
  PopupMenu,
} from "components";

// components
import SlideImage from "./SlideImage";
import Header from "./Header";
import FooterInfo from "./FooterInfo";
import FooterActions from "./FooterActions";
import InputCreateComment from "./InputCreateComment";

const widthDefault = 380;

const exampleComments = [
  {
    createdBy: {
      firstName: "Nguyễn Thị Trà Cúc Mai Lan Tíu Tíu",
      lastName:
        "uyễn Thị Trà Cúc Mai Lan Tíu Tíu uyễn Thị Trà Cúc Mai Lan Tíu Tíu",
      avatar: {
        url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
      },
    },
    content:
      "Máy tính của bạn trở nên quá tải đến từ các nguyên nhân như WMI Provider Host (WmiPrvSE.EXE), System Idle Process, Svchost.exe (netscvs), các tiến trình chạy ngầm hay trình diệt virus và sự xuất hiện của virus cũng sẽ khiến máy hoạt động chậm đi, cụ thể như s",

    _id: "11232312a",
  },
  {
    createdBy: {
      firstName: "John",
      lastName: "aab222b",
      avatar: {
        url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
      },
    },
    content: "Heelo 123",
    _id: "1123423123",
  },
];

const menus = [
  { label: "Lưu", icon: icons.BookmarkBorderOutlinedIcon, value: "save" },
  { label: "Sửa", icon: icons.EditIcon, value: "edit" },
  { label: "Xóa bài viết", icon: icons.DeleteForeverIcon, value: "delete" },
];

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  length: 0,
  isLoading: false,
};

export default function PopupDetailPost(props) {
  const { open, postID, onClose, post } = props;
  const { user } = useAuth();
  const {
    handleCreateComment,
    handleGetComments,
    handleSubmitEditComment,
    handleDeleteComment,
    handleToggleLike,
  } = usePost();

  const [comments, setComments] = React.useState(exampleComments);
  const [form, setForm] = React.useState({ comment: "" });
  const [openMenu, setOpenMenu] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize); // COMMENTS
  const [editCommentID, setEditCommentID] = React.useState(null);

  const menuRef = React.useRef();

  const handleGetCommentsCustom = React.useCallback(async () => {
    if (!paginate.isNextPage) return;
    setPaginate({ ...paginate, isLoading: true });
    const response = await handleGetComments(paginate.page, postID);
    console.log("handleGetCommentsCustom", response);
    setPaginate({
      page: response.next,
      isNextPage: response.hasNextPage ? true : false,
      data: [...response.data, ...paginate.data],
      totalLength: response.totalLength,
      isLoading: false,
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
  const handleLikePostCustom = async () => {
    const response = await handleToggleLike(postID);
    console.log("handleToggleLike", response);
  };
  // const handleGetCommentChildren = async (commentID) => {
  //   const newComments = comments.map((item) => {
  //     if (item._id !== commentID) return item;
  //     return {
  //       ...item,
  //       replies: [
  //         {
  //           createdBy: {
  //             firstName: "Nguyễn Thị",
  //             lastName: "Uyên",
  //             avatar: {
  //               url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  //             },
  //           },
  //           content: "hello 123",
  //           _id: "12312a",
  //         },
  //       ],
  //     };
  //   });
  //   setComments(newComments);
  //   return true;
  // };

  // -------------------- comment
  // -------------------- comment ---//

  const handleIsEditComment = (commentID) =>
    setEditCommentID(commentID || null);

  const handleSubmitComment = React.useCallback(async () => {
    if (!form.comment) return;
    const response = await handleCreateComment(form.comment, postID);
    if (response) {
      setPaginate({
        ...paginate,
        totalLength: paginate.totalLength + 1,
        data: [response, ...paginate.data],
      });
      setComments([response, ...comments]);
      setForm({ comment: "" });
    }
    console.log("resss", response);
  }, [comments, form, postID]);

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
    return true;
  };

  return (
    <Dialog open={open} keepMounted onClose={onClose} fullScreen>
      <Paper sx={{ bgcolor: "background.navbar", overflow: "hidden" }}>
        <PopupMenu
          open={openMenu}
          onClose={handleToggleOpenMenu}
          onClick={(action) => console.log("action", action)}
          ref={menuRef}
          lists={menus}
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
            <SlideImage post={post} />

            {/* content */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "auto", md: widthDefault },
                py: 2,
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

              {/* footer */}
              <FooterInfo
                likeLength={post?.likes?.length}
                commentLength={paginate?.totalLength}
              />

              {/* action footer */}
              <FooterActions
                isLike={isLike}
                handleLikePost={handleLikePostCustom}
              />

              {/* // comments */}
              <Box sx={{ px: 2 }}>
                <Divider />

                {paginate?.isNextPage ? (
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

                {paginate?.isLoading ? (
                  <Box
                    sx={{
                      "& .lds-ellipsis": {
                        width: 30,
                        height: 30,
                        "& div": { width: 8, height: 8, top: 15 },
                      },
                    }}
                  >
                    <LoadingEllipsisElement />
                  </Box>
                ) : (
                  ""
                )}

                <Stack spacing={2} sx={{ pt: 2, pb: 8 }}>
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
      </Paper>
    </Dialog>
  );
}
