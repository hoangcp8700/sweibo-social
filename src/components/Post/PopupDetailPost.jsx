import * as React from "react";
import Slider from "react-slick";
import {
  Dialog,
  DialogContent,
  Paper,
  Box,
  Divider,
  IconButton,
  Avatar,
  Stack,
  Typography,
  styled,
  Button,
  useTheme,
} from "@mui/material";
import { icons } from "constants";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import typeLike from "utils/typeLike";
import { fToNow } from "utils/formatTime";
import { lineClampStyle } from "utils/lineClampStyle";
import { CommentItem } from "components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const EmojiButtonStyle = styled(IconButton)(({ theme }) => ({
  "& svg": { fontSize: 14 },
  padding: 0,
}));

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const images = [
  {
    url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/11/09/18/24/human-rights-3805188_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/03/02/09/10/woman-3192674_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/03/15/02/50/doll-3227004_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/02/11/16/38/coil-632650_960_720.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1840011_960_720.jpg",
  },
];

const widthDefault = 380;

export default function PopupLikeOfPost(props) {
  const { open, postID, onClose } = props;

  React.useEffect(() => {
    if (!open || postID) return;
    const getUserLike = () => {
      try {
        // const response  = await
      } catch (error) {
        console.log("err", error);
      }
    };
    getUserLike();
  }, [open, postID]);

  const theme = useTheme();
  const isMobileRes = theme.breakpoints.down("sm");

  const [isLike, setIsLike] = React.useState(false);

  const handleLikePost = () => setIsLike(!isLike);
  return (
    <Dialog open={open} keepMounted onClose={onClose} fullScreen>
      <Paper sx={{ bgcolor: "background.navbar", overflow: "hidden" }}>
        <DialogContent sx={{ p: 0 }}>
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
            }}
          >
            <Box
              sx={{
                position: { xs: "relative", md: "sticky" },
                top: 0,
                flex: 3,
                width: "100%",
                bgcolor: "common.black",
                "& .slick-slider": {
                  width: "50vw",
                  height: { xs: "50vh", md: "100vh" },
                  m: "0 auto",
                  "& .slick-list": {
                    height: "100%",
                  },
                  "& .slick-arrow": {
                    "&:before": {
                      fontSize: { xs: 30, sm: 40 },
                    },
                    "&.slick-prev": {
                      left: { xs: -50, sm: -60 },
                    },
                    "&.slick-next": {
                      right: -45,
                    },
                  },
                },
              }}
            >
              <Box>
                <Slider {...settings}>
                  {images.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        height: { xs: "50vh", md: "100vh" },
                      }}
                    >
                      <img src={item.url} alt={index} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "auto", md: widthDefault },
                py: 2,
              }}
            >
              {/* header */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 36, height: 36 }} />
                  <Stack>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "common.white" }}
                    >
                      hoang cp
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        variant="caption"
                        sx={{ color: "common.white" }}
                      >
                        {fToNow(new Date())}
                      </Typography>
                      <IconButton
                        sx={{
                          p: 0,
                          "& svg": {
                            fontSize: 14,
                            fill: (theme) => theme.palette.common.white,
                          },
                        }}
                      >
                        {/* {post?.status === "Public"
                          ? icons.PublicIcon
                          : icons.LockOpenIcon} */}
                        {icons.PublicIcon}
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
                <IconButton>{icons.MoreHorizIcon}</IconButton>
              </Stack>

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
              <Box sx={{ px: 2 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 1 }}
                >
                  <Stack direction="row">
                    <EmojiButtonStyle
                      sx={{ svg: { fill: (theme) => theme.palette.info.main } }}
                    >
                      {icons.LikeIcon}
                    </EmojiButtonStyle>
                    <EmojiButtonStyle
                      sx={{
                        svg: { fill: (theme) => theme.palette.error.main },
                      }}
                    >
                      {icons.HeartIcon}
                    </EmojiButtonStyle>
                    <Box sx={{ ml: !isMobileRes ? 2 : 1 }}>
                      <TypographyCustom
                      // onClick={() => handleActionPost("like", post?._id)}
                      >
                        {!isMobileRes
                          ? `Phạm thanh tùng và 20k người khác`
                          : 2321}
                      </TypographyCustom>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TypographyCustom
                    // onClick={() => handleActionPost("comment", post?._id)}
                    >
                      388 bình luận
                    </TypographyCustom>
                    <TypographyCustom
                    // onClick={() => handleActionPost("share", post?._id)}
                    >
                      22 chia sẽ
                    </TypographyCustom>
                  </Stack>
                </Stack>

                <Divider />
              </Box>

              {/* action footer */}
              <Box>
                <Stack direction="row" alignItems="center">
                  <ButtonStyle
                    sx={{
                      "& svg": {
                        fill: (theme) =>
                          isLike
                            ? theme.palette.info.main
                            : theme.palette.common.white,
                      },
                    }}
                    startIcon={isLike ? icons.LikeIcon : icons.NoLikeIcon}
                    onClick={handleLikePost}
                  >
                    Thích
                  </ButtonStyle>
                  <ButtonStyle startIcon={icons.CommentIcon}>
                    Bình luận
                  </ButtonStyle>
                  <ButtonStyle startIcon={icons.ShareIcon}>Chia sẽ</ButtonStyle>
                </Stack>
              </Box>

              {/* // comments */}
              <Box sx={{ px: 2 }}>
                <Divider />
                <Stack spacing={2} sx={{ pt: 2, pb: 8 }}>
                  <CommentItem />
                  <CommentItem />
                  <CommentItem />
                  <CommentItem />
                </Stack>
              </Box>

              {/* // input create comment */}
              <Box
                sx={{
                  bgcolor: "primary.main",
                  width: "100%",
                  maxWidth: { xs: "auto", md: widthDefault },
                  height: 50,
                  position: "absolute",
                  bottom: 0,
                }}
              >
                asd
              </Box>
            </Box>
          </Stack>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
