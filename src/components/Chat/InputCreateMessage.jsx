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
import { LoadingEllipsisElement } from "components";

const initialize = {
  text: "",
};
const InputCreateMessage = (props) => {
  const { onSubmit } = props;
  const anchorRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState(initialize);

  const handleTargetEmoji = React.useCallback((e) => setOpen(!open), [open]);
  const handleChangeForm = React.useCallback(
    (e) => setForm({ ...form, [e.target.name]: e.target.value }),
    [form]
  );

  const handleSubmit = async () => {
    if (submitting) return;
    if (!form.text) return;

    setSubmitting(true);
    await onSubmit(form);

    setForm(initialize);
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {submitting ? (
        <Box
          sx={{
            position: "absolute",
            top: -20,
            left: 0,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              "& .lds-ellipsis": {
                width: 30,
                height: 30,
                "& div": { width: 8, height: 8, top: 0 },
              },
            }}
          >
            <LoadingEllipsisElement />
          </Box>
        </Box>
      ) : (
        ""
      )}
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
          disabled={submitting}
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
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
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
