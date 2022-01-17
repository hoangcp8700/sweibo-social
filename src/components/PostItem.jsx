import React from "react";
import {
  Paper,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/styles";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  flex: 1,
  textTransform: "capitalize",
  fontWeight: 400,
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
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

const TypographyCustom = ({ children }) => {
  return (
    <Typography
      variant="body2"
      sx={[
        { ...lineClampStyle(1), color: "text.secondary" },
        (theme) => ({
          [theme.breakpoints.down("480")]: { fontSize: 12 },
        }),
      ]}
    >
      {children}
    </Typography>
  );
};
const PostItem = (props) => {
  const theme = useTheme();
  const isMobileRes = theme.breakpoints.down("sm");

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
      }}
    >
      <Stack>
        {/* header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 36, height: 36 }} />
            <Stack>
              <Typography variant="subtitle2">Hoang Cong Phan</Typography>
              <Typography variant="caption">2 gio</Typography>
            </Stack>
          </Stack>
          <IconButton>{icons.MoreHorizIcon}</IconButton>
        </Stack>

        {/* content */}
        <Stack>
          <Box sx={{ px: 2 }}>
            <Typography>
              Giữa người với người đừng nghĩ quá kĩ. Nghĩ thông rồi sẽ đau lòng.
            </Typography>
          </Box>
          <Stack direction="row" sx={{ mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <img src={"https://i.pravatar.cc/300"} alt="aa" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <img src={"https://i.pravatar.cc/300"} alt="aa" />
            </Box>
          </Stack>
        </Stack>

        {/* footer */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
          <Stack direction="row">
            <EmojiButtonStyle
              sx={{ svg: { fill: (theme) => theme.palette.info.main } }}
            >
              {icons.LikeIcon}
            </EmojiButtonStyle>
            <EmojiButtonStyle
              sx={{ svg: { fill: (theme) => theme.palette.error.main } }}
            >
              {icons.HeartIcon}
            </EmojiButtonStyle>
            <Box sx={{ ml: !isMobileRes ? 2 : 1 }}>
              <TypographyCustom>
                {!isMobileRes ? `Phạm thanh tùng và 20k người khác` : 2321}
              </TypographyCustom>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <TypographyCustom>388 bình luận</TypographyCustom>
            <TypographyCustom>22 chia sẽ</TypographyCustom>
          </Stack>
        </Stack>

        <Divider />
        {/* action footer */}
        <Stack direction="row" alignItems="center">
          <ButtonStyle startIcon={icons.LikeIcon}>Thích</ButtonStyle>
          <ButtonStyle startIcon={icons.CommentIcon}>Bình luận</ButtonStyle>
          <ButtonStyle startIcon={icons.ShareIcon}>Chia sẽ</ButtonStyle>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PostItem;
