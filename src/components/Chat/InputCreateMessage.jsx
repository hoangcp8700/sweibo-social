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

const initialize = {
  text: "",
};
const InputCreateMessage = (props) => {
  const { onSubmit } = props;
  const anchorRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(initialize);

  const handleTargetEmoji = React.useCallback((e) => setOpen(!open), [open]);
  const handleChangeForm = React.useCallback(
    (e) => setForm({ ...form, [e.target.name]: e.target.value }),
    [form]
  );

  const handleSubmit = async () => {
    if (!form.text) return;
    await onSubmit(form);
    setForm(initialize);
  };

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
          value={form?.text}
          name="text"
          onChange={handleChangeForm}
          sx={{
            width: "100%",
            "& input": { py: 1, fontSize: 14 },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
          onClick={handleSubmit}
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
          handleSubmit={(value) =>
            setForm({ ...form, text: `${form.text} ${value.emoji}` })
          }
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default InputCreateMessage;
