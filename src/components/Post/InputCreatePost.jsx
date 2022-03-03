import React from "react";
import { Paper, Stack, Avatar, TextField } from "@mui/material";
import { useAuth } from "hooks";
import PopupCreatePost from "./PopupCreatePost";

const InputCreatePost = (props) => {
  const { handleSubmitPost, open, onClick, postEdit } = props;
  const { user } = useAuth();

  return (
    <Paper
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
      }}
    >
      <PopupCreatePost
        postEdit={postEdit}
        open={open}
        onClose={onClick}
        handleSubmitPost={handleSubmitPost}
      />

      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Avatar src={user?.avatar?.url} />
        <TextField
          fullWidth
          onClick={onClick}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& input": {
              py: 1,
              fontSize: 14,
              cursor: "pointer",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
              transition: "background-color 150ms",

              "&:hover": {
                bgcolor: "background.opacity1",
              },
            },
          }}
          placeholder={`${
            user?.firstName && user?.lastName
              ? `${user?.firstName} ${user?.lastName}`
              : "Bạn"
          } ơi, bạn đang nghĩ gì thế`}
        />
      </Stack>
    </Paper>
  );
};

export default InputCreatePost;
