import React from "react";
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { PATH_PAGE } from "constants/paths";
import { Link } from "react-router-dom";
import { fToNow } from "utils/formatTime";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";
import { PopupMenu, LoadingEllipsisElement } from "components";

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
  // const { item, children, handleGetCommentChildren } = props;
  const { item } = props;
  const [isLike, setIsLike] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const menuRef = React.useRef();

  const handleLikeCommentCustom = () => {
    setIsLike(!isLike);
  };

  // const handleGetCommentChildrenCustom = async () => {
  //   setIsLoading(true);
  //   const response = await handleGetCommentChildren(item._id);
  //   console.log("re", response);
  //   if (response) {
  //     setIsLoading(false);
  //   }
  // };
  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);

  return (
    <Box sx={{ position: "relative" }}>
      <PopupMenu
        open={openMenu}
        onClose={handleToggleOpenMenu}
        onClick={(action) => console.log("action", action)}
        ref={menuRef}
        lists={menus}
      />

      <Box sx={{ position: "relative" }}>
        <Stack direction="row" spacing={2}>
          {/* // ---------------------------------- */}
          <Typography
            sx={{ mt: 1 }}
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=hoangcp219@gmail.com`}
          >
            <Avatar src={item?.avatar?.url} sx={{ width: 36, height: 36 }} />
          </Typography>
          <Stack>
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
              </Stack>

              <Typography
                variant="body2"
                sx={{ color: "text.comment", cursor: "comtext-menu" }}
              >
                {item?.content}
              </Typography>
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
              <TypographyStyle label={fToNow(new Date())} />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* {isLoading ? (
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
      )} */}
      {/* {children ? <Stack sx={{ ml: 7, mt: 2, gap: 1 }}>{children}</Stack> : ""} */}
    </Box>
  );
};

export default CommentItem;
