import React from "react";
import {
  Stack,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import { EmojiPicker } from "components";

const InputCreateMessage = () => {
  const anchorRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const handleTargetEmoji = React.useCallback((e) => setOpen(!open), [open]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          sx={{
            "& svg": {
              fontSize: 20,
              fill: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {icons.PhotoIcon}
        </IconButton>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            width: "100%",
            "& input": { py: 1, fontSize: 14 },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          placeholder="..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  ref={anchorRef}
                  onClick={handleTargetEmoji}
                  sx={{
                    "& svg": {
                      fontSize: 20,
                      fill: (theme) => theme.palette.primary.main,
                    },
                  }}
                >
                  {icons.EmojiEmotionsIcon}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          sx={{
            "& svg": {
              fontSize: 20,
              fill: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {icons.SendIcon}
        </IconButton>
      </Stack>
      {open ? (
        <EmojiPicker
          anchor={anchorRef}
          open={open}
          handleClose={handleTargetEmoji}
          handleSubmit={(value) => setContent(`${content} ${value.emoji}`)}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default InputCreateMessage;
