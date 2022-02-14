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
  const { commentLength } = props;
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
              {!isMobileRes ? `Phạm thanh tùng và 20k người khác` : 2321}
            </TypographyCustom>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <TypographyCustom
          // onClick={() => handleActionPost("comment", post?._id)}
          >
            {commentLength} bình luận
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
  );
};

export default FooterInfo;
