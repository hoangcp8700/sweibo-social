import React from "react";
import {
  Box,
  Stack,
  Avatar,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { icons } from "constants";
import { EmojiPicker } from "components";

const InputCreateComment = ({
  widthDefault,
  form,
  onChangeForm,
  user,
  ...props
}) => {
  const [openEmoji, setOpenEmoji] = React.useState(false);
  const anchorRef = React.useRef();

  const handleToggleOpenEmoji = () => setOpenEmoji(!openEmoji);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.navbar",
          width: "100%",
          maxWidth: { xs: "auto", md: widthDefault || "auto" },
          height: 60,
          position: "absolute",
          bottom: 0,
        }}
      >
        {openEmoji ? (
          <EmojiPicker
            anchor={anchorRef}
            open={openEmoji}
            handleClose={handleToggleOpenEmoji}
            handleSubmit={(value) =>
              onChangeForm("comment", `${form.comment}${value.emoji}`)
            }
          />
        ) : (
          ""
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ px: 2, height: "100%" }}
        >
          <Avatar sx={{ width: 28, height: 28 }} src={user?.avatar?.url} />
          <TextField
            autoComplete="off"
            {...props}
            value={form?.comment}
            onChange={(e) => onChangeForm("comment", e.target.value)}
            fullWidth
            sx={{
              "& input": { py: 1, fontSize: 14 },
              "& .MuiOutlinedInput-root": {
                borderRadius: (theme) => theme.sizes.radius,
              },
            }}
            placeholder="Viết bình luận"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ "& svg": { fontSize: 20 } }}
                    ref={anchorRef}
                    onClick={handleToggleOpenEmoji}
                  >
                    {icons.EmojiEmotionsIcon}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default InputCreateComment;
