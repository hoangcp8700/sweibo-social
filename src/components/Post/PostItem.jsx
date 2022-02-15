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
import { styled } from "@mui/styles";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";
import { Masonry } from "components";
import { fToNow } from "utils/formatTime";

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  flex: 1,
  textTransform: "capitalize",
  fontWeight: 400,
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
  },
  "& svg": {
    fill: theme.palette.text.primary,
  },
  [theme.breakpoints.down("480")]: {
    fontSize: 12,
    padding: theme.spacing(0.5, 0),
    "& svg": {
      fontSize: `14px!important`,
    },
  },
}));

const EmojiButtonStyle = styled(IconButton)(({ theme }) => ({
  "& svg": { fontSize: 14 },
  padding: 0,
}));

const TypographyCustom = ({ children, ...props }) => {
  return (
    <Typography
      {...props}
      variant="body2"
      sx={[
        { ...lineClampStyle(1), color: "text.primary" },
        (theme) => ({
          cursor: "pointer",
          [theme.breakpoints.down("480")]: { fontSize: 12 },
        }),
      ]}
    >
      {children}
    </Typography>
  );
};
const images = [
  {
    url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  },
  // {
  //   url: "https://cdn.pixabay.com/photo/2018/11/09/18/24/human-rights-3805188_960_720.jpg",
  // },
  // {
  //   url: "https://cdn.pixabay.com/photo/2018/03/02/09/10/woman-3192674_960_720.jpg",
  // },
  // {
  //   url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  // },
  // {
  //   url: "https://cdn.pixabay.com/photo/2015/02/11/16/38/coil-632650_960_720.jpg",
  // },
  // {
  //   url: "https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1840011_960_720.jpg",
  // },
];
const PostItem = (props) => {
  const { post, containerStyle, handleActionPost } = props;

  const [isLike, setIsLike] = React.useState(false);

  const handleLikePost = () => setIsLike(!isLike);

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
        ...containerStyle,
      }}
    >
      <Stack>
        {/* header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 36, height: 36 }} />
            <Stack>
              <Typography variant="subtitle2">
                {post?.createdBy?.firstName} {post?.createdBy?.lastName}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption">
                  {post?.createdAt && fToNow(post?.createdAt)}
                </Typography>
                <IconButton
                  sx={{
                    p: 0,
                    "& svg": {
                      fontSize: 14,
                      fill: (theme) => theme.palette.text.primary,
                    },
                  }}
                >
                  {post?.status === "Public"
                    ? icons.PublicIcon
                    : icons.LockOpenIcon}
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <IconButton>{icons.MoreHorizIcon}</IconButton>
        </Stack>

        {/* content */}
        <Stack>
          <Box sx={{ px: 2 }}>
            <Typography>{post?.content}</Typography>
          </Box>
          {post?.images ? (
            <Stack
              direction="row"
              sx={{ mt: 1 }}
              onClick={() => handleActionPost("detail", post?._id)}
            >
              <Masonry lists={post?.images} />
            </Stack>
          ) : (
            ""
          )}
        </Stack>

        {/* footer */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Stack direction="row">
            {post?.likes?.length ? (
              <>
                <EmojiButtonStyle
                  sx={{ svg: { fill: (theme) => theme.palette.info.main } }}
                >
                  {icons.LikeIcon}
                </EmojiButtonStyle>

                <Box sx={{ ml: 0.5 }}>
                  <TypographyCustom
                    onClick={() => handleActionPost("like", post?._id)}
                  >
                    {post?.likes?.length}
                  </TypographyCustom>
                </Box>
              </>
            ) : (
              ""
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            {post?.commentCount ? (
              <TypographyCustom
                onClick={() => handleActionPost("comment", post?._id)}
              >
                {post?.commentCount} bình luận
              </TypographyCustom>
            ) : (
              " "
            )}
            <TypographyCustom
              onClick={() => handleActionPost("share", post?._id)}
            >
              22 chia sẽ
            </TypographyCustom>
          </Stack>
        </Stack>

        <Divider />
        {/* action footer */}
        <Stack direction="row" alignItems="center">
          <ButtonStyle
            startIcon={isLike ? icons.LikeIcon : icons.NoLikeIcon}
            onClick={handleLikePost}
          >
            Thích
          </ButtonStyle>
          <ButtonStyle startIcon={icons.CommentIcon}>Bình luận</ButtonStyle>
          <ButtonStyle startIcon={icons.ShareIcon}>Chia sẽ</ButtonStyle>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PostItem;
