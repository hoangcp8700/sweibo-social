import React from "react";
import { Avatar, IconButton, Stack, Box, Typography } from "@mui/material";
import { PATH_PAGE } from "constants/paths";
import { Link } from "react-router-dom";
import { fToNow } from "utils/formatTime";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";
import { PopupMenu } from "components";

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
  const { item, children } = props;
  const [isLike, setIsLike] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const menuRef = React.useRef();

  const handleLikeCommentCustom = () => {
    setIsLike(!isLike);
  };

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
            <TypographyStyle
              label={"Thích"}
              onClick={handleLikeCommentCustom}
              sx={{ color: isLike ? "info.main" : "text.secondary" }}
            />
            <TypographyStyle label={fToNow(new Date())} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CommentItem;
