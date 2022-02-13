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
import { useAuth } from "hooks";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import { CommentItem, CommentItemChildren, PopupMenu } from "components";

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
  const { open, postID, onClose } = props;
  const { user } = useAuth();

  const [comments, setComments] = React.useState(exampleComments);
  const [form, setForm] = React.useState({ comment: "" });
  const [openMenu, setOpenMenu] = React.useState(false);
  const [paginate, setPaginate] = React.useState(initialize);

  const menuRef = React.useRef();

  React.useEffect(() => {
    if (!open || postID) return;
    setPaginate({ ...paginate, isLoading: true });
    const getUserLike = async () => {
      try {
        // const response  = await
        setPaginate({ ...paginate, isLoading: false });
      } catch (error) {
        setPaginate({ ...paginate, isLoading: false });
        console.log("err", error);
      }
    };
    getUserLike();
  }, [open, postID]);

  const [isLike, setIsLike] = React.useState(false);

  const handleLikePost = () => setIsLike(!isLike);
  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);

  const handleSubmitComment = React.useCallback(async () => {
    if (!form.comment) return;
    console.log("form", form);
    const newComment = {
      createdBy: {
        firstName: "Nguyễn Thị",
        lastName: "Uyên",
        avatar: {
          url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
        },
      },
      content: form.comment,
      _id: "12312a",
    };

    setComments([newComment, ...comments]);
    setForm({ comment: "" });
  }, [form]);

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
            <SlideImage />

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
                handleToggleOpenMenu={handleToggleOpenMenu}
              />

              {/* content */}
              <Box sx={{ m: 2 }}>
                <Typography>
                  Đầu nem tẹng wà cko mn nek 💌🎉 1. Lì xì ( 10 nqừi ) 💟 2. Fs
                  ( 5 nqừi )🎉 3. Pão wall 🎊 4. Cnn 💋 5. Xưq hô vk ck ( 7 days
                  ) ❤ 6. Pão tjm avatar ( hết lun ) 💕 7. Avatar ckéo ( 1 nqừi
                  may mắn nke ) 💙 8. Đi chơy 3 chung ngày 3 đim 9. Ib lwen .
                  Hợp iu lun nek 💌 10. Cho 🍭 Mấy pn ckọn ik nek 💫 iu lém á 😙
                  :)))
                </Typography>
              </Box>

              {/* footer */}
              <FooterInfo commentLength={comments?.length} />

              {/* action footer */}
              <FooterActions isLike={isLike} handleLikePost={handleLikePost} />

              {/* // comments */}
              <Box sx={{ px: 2 }}>
                <Divider />
                <Stack spacing={2} sx={{ pt: 2, pb: 8 }}>
                  {comments?.length
                    ? comments.map((item) => (
                        <CommentItem
                          key={item._id}
                          item={item}
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
