import * as React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Stack,
  DialogTitle,
  Slide,
  Paper,
  Box,
  Divider,
  IconButton,
  DialogActions,
} from "@mui/material";
import { icons } from "constants";
import { useAuth, usePost } from "hooks";
import { CommentItem, LoadingEllipsisElement } from "components";

import InputCreateComment from "./PopupDetailPost/InputCreateComment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  totalLength: 0,
  isLoading: false,
};

export default function PopupCommentOfPost(props) {
  const { open, postID, onClose, handleCommentLength } = props;
  const { user } = useAuth();

  const [paginate, setPaginate] = React.useState(initialize); // COMMENTS
  const [form, setForm] = React.useState({ comment: "" });
  const [editCommentID, setEditCommentID] = React.useState(null);

  const {
    handleCreateComment,
    handleGetComments,
    handleSubmitEditComment,
    handleDeleteComment,
  } = usePost();

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

  const handleIsEditComment = (commentID) =>
    setEditCommentID(commentID || null);

  const handleSubmitComment = React.useCallback(async () => {
    if (!form.comment) return;
    const response = await handleCreateComment(form.comment, postID);
    if (response) {
      setPaginate({
        ...paginate,
        totalLength: paginate.totalLength + 1,
        data: [...paginate.data, response],
      });
      setForm({ comment: "" });
      handleCommentLength(postID, true);
    }
    console.log("resss", response);
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

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth="mobile"
    >
      <Paper sx={{ bgcolor: "background.navbar", position: "relative" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Tất cả bình luận
          </DialogTitle>
          <Divider />
          {/* btn close */}
          <Paper
            elevation={5}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "background.opacity2",
              borderRadius: "50%",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                "& svg": {
                  fill: (theme) => theme.palette.text.primary,
                  fontSize: 14,
                },
              }}
            >
              {icons.CloseIcon}
            </IconButton>
          </Paper>
        </Box>

        <DialogContent
          sx={{
            maxHeight: 580,
            "&::-webkit-scrollbar-track": {
              // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
              borderRadius: "10px",
              bgcolor: (theme) => theme.palette.background.opacity,
            },

            "&::-webkit-scrollbar": {
              width: 15,
              backgroundColor: "transparent",
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: (theme) => theme.palette.grey[500],
              borderRadius: "10px",
            },
          }}
        >
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
          ) : paginate?.totalLength > 0 ? (
            <Typography variant="body2">
              Tổng cộng có {paginate?.totalLength} bình luận
            </Typography>
          ) : (
            <Typography variant="body2">Chưa có bình luận nào</Typography>
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
                    handleSubmitEditComment={handleSubmitEditCommentCustom}
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
        </DialogContent>

        {/* // input create comment */}
        <InputCreateComment
          form={form}
          user={user}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitComment(postID)}
          onChangeForm={(name, value) => setForm({ ...form, [name]: value })}
        />
      </Paper>
    </Dialog>
  );
}
