import React from "react";
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  Box,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { PATH_PAGE } from "constants/paths";
import { Link } from "react-router-dom";
import { fToNow } from "utils/formatTime";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";
import { PopupMenu, LoadingEllipsisElement } from "components";
import { MButton } from "components/MUI";

const TypographyStyle = ({ label, sx, ...props }) => {
  return (
    <Typography
      variant="subtitle2"
      sx={{
        fontSize: { xs: 10, sm: 13 },
        color: "text.secondary",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
        ...sx,
      }}
      {...props}
    >
      {label}
    </Typography>
  );
};

const menus = [
  { label: "Sửa bình luận", icon: icons.EditIcon, value: "edit" },
  { label: "Xóa bình luận", icon: icons.DeleteForeverIcon, value: "delete" },
];

const CommentItem = (props) => {
  const {
    item,
    user,
    editCommentID,
    handleIsEditComment,
    handleSubmitEditComment,
    handleDeleteComment,
  } = props;
  const [openMenu, setOpenMenu] = React.useState(false);
  const [form, setForm] = React.useState({ comment: "" });

  const menuRef = React.useRef();

  React.useEffect(() => {
    if (!editCommentID) return;
    setForm({ comment: item?.content });
  }, [editCommentID]);

  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);
  const handleChangeForm = React.useCallback(
    (e) => setForm({ ...form, [e.target.name]: e.target.value }),
    [form]
  );

  const handleToggleEdit = (commentID) => {
    handleIsEditComment(commentID || null);
  };

  const handleActions = (name, commentID) => {
    console.log(name);
    if (name === "edit") {
      handleToggleEdit(commentID);
    }
    if (name === "delete") {
      handleDeleteComment(commentID);
    }
    handleToggleOpenMenu();
  };

  const handleSubmitEditCommentCustom = async () => {
    if (!form?.comment) return;
    const response = await handleSubmitEditComment(form?.comment, item?._id);
    if (response) {
      setForm({ comment: "" });
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      {openMenu ? (
        <PopupMenu
          open={openMenu}
          onClose={handleToggleOpenMenu}
          onClick={(action) => handleActions(action, item?._id)}
          ref={menuRef}
          lists={menus}
        />
      ) : (
        ""
      )}

      <Box sx={{ position: "relative" }}>
        <Stack direction="row" spacing={2}>
          {/* // ---------------------------------- */}
          <Typography
            sx={{ mt: 1 }}
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=hoangcp219@gmail.com`}
          >
            <Avatar
              src={item?.createdBy?.avatar?.url}
              sx={{ width: 36, height: 36 }}
            />
          </Typography>
          <Stack sx={{ flexGrow: 1, overflowWrap: "anywhere" }}>
            <Box
              sx={{
                bgcolor: "background.opacity1",
                borderRadius: 5,
                px: 2,
                py: 1,
                width: "fit-content",
                "&:hover .dot": {
                  opacity: 1,
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: 13,
                    color: "text.primary",
                    ...lineClampStyle(2),
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  component={Link}
                  to={`/${PATH_PAGE.profile.link}/posts?email=hoangcp219@gmail.com`}
                >
                  {item?.createdBy?.firstName} {item?.createdBy?.lastName}
                </Typography>
                {!editCommentID ? (
                  <IconButton
                    className="dot"
                    ref={menuRef}
                    onClick={handleToggleOpenMenu}
                    sx={{
                      p: 0,
                      opacity: 0,
                      "& svg": {
                        fill: (theme) => theme.palette.text.primary,
                        fontSize: 16,
                      },
                    }}
                  >
                    {icons.MoreHorizIcon}
                  </IconButton>
                ) : (
                  ""
                )}
              </Stack>

              {/* /// comment */}
              {editCommentID ? (
                <Box>
                  <Box sx={{ mb: 1 }}>
                    <TextareaAutosize
                      style={{
                        width: "100%",
                        fontSize: 14,
                        background: "transparent",
                        outline: "none",
                        border: "none",
                        resize: "none",
                        fontFamily: "Public Sans,sans-serif",
                        color: user?.settings?.isDarkMode
                          ? "#EAEAEA"
                          : "#161C24",
                      }}
                      value={form?.comment}
                      name="comment"
                      onChange={handleChangeForm}
                    />
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MButton
                      variant="contained"
                      sx={{ fontSize: 12, py: 0.5 }}
                      onClick={handleSubmitEditCommentCustom}
                    >
                      Sửa
                    </MButton>
                    <MButton
                      variant="cancel"
                      sx={{ fontSize: 12, py: 0.5 }}
                      onClick={() => handleToggleEdit()}
                    >
                      Hủy bỏ
                    </MButton>
                  </Stack>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "text.comment", cursor: "comtext-menu" }}
                >
                  {item?.content}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={2} sx={{ ml: 2, mt: 0.25 }}>
              {/* <TypographyStyle
                label={"Thích"}
                onClick={handleLikeCommentCustom}
                sx={{ color: isLike ? "info.main" : "text.secondary" }}
              />
              <Badge badgeContent={4} color="primary">
                <TypographyStyle
                  label={"Trả lời"}
                  // onClick={handleGetCommentChildrenCustom}
                />
              </Badge> */}
              {item?.createdAt ? (
                <TypographyStyle label={fToNow(item?.createdAt)} />
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* {children ? <Stack sx={{ ml: 7, mt: 2, gap: 1 }}>{children}</Stack> : ""} */}
    </Box>
  );
};

export default CommentItem;
