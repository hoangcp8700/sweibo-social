import React from "react";
import LazyLoad from "react-lazyload";
import {
  Paper,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { icons } from "constants";
import { Masonry, PopupMenu } from "components";

// components
import Header from "./PopupDetailPost/Header";
import FooterInfo from "./PopupDetailPost/FooterInfo";
import FooterActions from "./PopupDetailPost/FooterActions";

const menus = [
  { label: "Lưu", icon: icons.BookmarkBorderOutlinedIcon, value: "save-post" },
  { label: "Sửa", icon: icons.EditIcon, value: "edit-post" },
  {
    label: "Xóa bài viết",
    icon: icons.DeleteForeverIcon,
    value: "delete-post",
  },
];

const PostItem = (props) => {
  const { post, isLike, containerStyle, handleActionPost } = props;
  const [openMenu, setOpenMenu] = React.useState(false);

  const menuRef = React.useRef();

  const handleToggleOpenMenu = () => setOpenMenu(!openMenu);

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
        ...containerStyle,
      }}
    >
      <PopupMenu
        open={openMenu}
        onClose={handleToggleOpenMenu}
        onClick={(action) => handleActionPost(action, post?._id)}
        ref={menuRef}
        lists={menus}
      />

      <Stack sx={{ pt: 2 }}>
        {/* header */}

        <Header
          ref={menuRef}
          post={post}
          handleToggleOpenMenu={handleToggleOpenMenu}
        />

        {/* content */}
        <Stack>
          <Box sx={{ px: 2 }}>
            <Typography>{post?.content}</Typography>
          </Box>

          {post?.images ? (
            <Stack
              direction="row"
              sx={{ mt: 1, cursor: "pointer" }}
              onClick={() => handleActionPost("detail", post?._id)}
            >
              <Masonry lists={post?.images} />
            </Stack>
          ) : (
            ""
          )}
        </Stack>

        {/* footer */}
        <FooterInfo
          likeLength={post?.likes?.length}
          commentLength={post?.commentCount}
          handleGetLikes={() => handleActionPost("like", post?._id)}
          handleGetComments={() => handleActionPost("comment", post?._id)}
        />

        <Divider />

        {/* action footer */}
        <FooterActions
          isLike={isLike}
          handleLikePost={() => handleActionPost("like-post", post?._id)}
          handleGetComments={() => handleActionPost("comment", post?._id)}
        />
      </Stack>
    </Paper>
  );
};

export default PostItem;
