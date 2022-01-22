import React from "react";
import { Paper, Stack, Avatar, TextField } from "@mui/material";

const CreatePost = () => {
  return (
    <Paper
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Avatar />
        <TextField
          fullWidth
          sx={{
            "& input": { py: 1, fontSize: 16 },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          placeholder="Hoàng ơi, bạn đang nghĩ gì thế"
        />
      </Stack>
    </Paper>
  );
};

export default CreatePost;
