import React from "react";
import { Box, Stack, Button, styled } from "@mui/material";
import { icons } from "constants";

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

const FooterActions = ({ isLike, handleLikePost, handleGetComments }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <ButtonStyle
          sx={{
            "& svg": {
              fill: (theme) =>
                isLike ? theme.palette.info.main : theme.palette.text.primary,
            },
            color: isLike ? "info.main" : "text.primary",
            "&:hover": {
              color: isLike ? "info.main" : "text.secondary",
            },
          }}
          startIcon={isLike ? icons.LikeIcon : icons.NoLikeIcon}
          onClick={handleLikePost}
        >
          Thích
        </ButtonStyle>
        <ButtonStyle startIcon={icons.CommentIcon} onClick={handleGetComments}>
          Bình luận
        </ButtonStyle>
        <ButtonStyle startIcon={icons.ShareIcon}>Chia sẻ</ButtonStyle>
      </Stack>
    </Box>
  );
};

export default FooterActions;
