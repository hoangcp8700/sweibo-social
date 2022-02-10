import React from "react";
import { Paper, Stack, Avatar, TextField } from "@mui/material";
import { useAuth } from "hooks";
import PopupCreatePost from "./PopupCreatePost";

const InputCreatePost = () => {
  const { user } = useAuth();

  const [isCreate, setIsCreate] = React.useState(false);

  const handleToggleIsCreate = () => setIsCreate(!isCreate);

  return (
    <Paper
      sx={{
        borderRadius: (theme) => theme.sizes.minBase,
        bgcolor: "background.navbar",
      }}
    >
      <PopupCreatePost open={isCreate} onClose={handleToggleIsCreate} />
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Avatar src={user?.avatar?.url} />
        <TextField
          fullWidth
          onClick={handleToggleIsCreate}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& input": {
              py: 1,
              fontSize: 16,
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
          placeholder="Hoàng ơi, bạn đang nghĩ gì thế"
        />
      </Stack>
    </Paper>
  );
};

export default InputCreatePost;
