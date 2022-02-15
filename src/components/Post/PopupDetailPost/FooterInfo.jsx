import React from "react";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  styled,
  useTheme,
  Divider,
} from "@mui/material";
import { lineClampStyle } from "utils/lineClampStyle";
import { icons } from "constants";

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

const FooterInfo = (props) => {
  const { commentLength, likeLength, handleGetLikes, handleGetComments } =
    props;
  const theme = useTheme();
  const isMobileRes = theme.breakpoints.down("sm");

  return (
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

          <Box sx={{ ml: 0.5 }}>
            <TypographyCustom onClick={handleGetLikes}>
              {likeLength}
            </TypographyCustom>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <TypographyCustom onClick={handleGetComments}>
            {commentLength} bình luận
          </TypographyCustom>

          <TypographyCustom
          // onClick={() => handleActionPost("share", post?._id)}
          >
            22 chia sẻ
          </TypographyCustom>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FooterInfo;
