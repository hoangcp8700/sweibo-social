import React from "react";
import { Avatar, Stack, Box, Typography } from "@mui/material";
import { PATH_PAGE } from "constants/paths";
import { Link } from "react-router-dom";
import { fToNow } from "utils/formatTime";

const actions = [
  { label: "Thích", value: "like" },
  { label: "Bình luận", value: "comment" },
];

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

const CommentItem = (props) => {
  const [isLike, setIsLike] = React.useState(false);

  const handleLikeCommentCustom = () => {
    console.log("run");
    setIsLike(!isLike);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Typography
        sx={{ pt: 1 }}
        component={Link}
        to={`/${PATH_PAGE.profile.link}/posts?email=hoangcp219@gmail.com`}
      >
        <Avatar />
      </Typography>
      <Stack>
        <Box
          sx={{ bgcolor: "background.opacity1", borderRadius: 5, px: 2, py: 1 }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 13, color: "text.primary" }}
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=hoangcp219@gmail.com`}
          >
            hoang cp
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.primary", cursor: "comtext-menu" }}
          >
            Đầu nem tẹng wà cko mn nek 💌🎉 1. Lì xì ( 10 nqừi ) 💟 2. Fs ( 5
            nqừi )🎉 3. Pão wall 🎊 4. Cnn 💋 5. Xưq hô vk ck ( 7 days )
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ ml: 2, mt: 0.25 }}>
          <TypographyStyle
            label={"Thích"}
            onClick={handleLikeCommentCustom}
            sx={{ color: isLike ? "info.main" : "text.secondary" }}
          />
          <TypographyStyle label={"Bình luận"} />
          <TypographyStyle label={fToNow(new Date())} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommentItem;
