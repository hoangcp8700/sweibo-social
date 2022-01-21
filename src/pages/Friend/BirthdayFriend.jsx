import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import { fDateOriginal } from "utils/formatTime";
import { EmojiPicker } from "components";
import MenuHeader from "components/MenuHeader/Main";

const BirthdayItem = (props) => {
  const { name, birthday, disabledInput = false, onSubmit } = props;
  const anchorRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const handleTargetEmoji = (e) => setOpen(!open);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems={!disabledInput ? "flex-start" : "center"}
        spacing={2}
      >
        <Avatar sx={{ width: 60, height: 60 }} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{name}</Typography>
          {birthday ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">
                {birthday && fDateOriginal(birthday)}
              </Typography>
              <Typography variant="body2">
                {new Date().getFullYear() - new Date(birthday).getFullYear()}{" "}
                tuổi
              </Typography>
            </Stack>
          ) : (
            ""
          )}

          {!disabledInput ? (
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                mt: 0.5,
                width: "100%",
                "& input": { py: 1, fontSize: 14 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: (theme) => theme.sizes.radius,
                },
              }}
              placeholder="Viết lên dòng thời gian của bạn ấy..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      ref={anchorRef}
                      onClick={handleTargetEmoji}
                      sx={{
                        "& svg": {
                          fontSize: 20,
                          fill: (theme) => theme.palette.background.opacity3,
                        },
                      }}
                    >
                      {icons.EmojiEmotionsIcon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            ""
          )}
        </Stack>
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

const BirthdayBox = ({ title, children }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: (theme) => theme.sizes.minBase }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

const BirthdayFriend = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          maxWidth: (theme) => theme.breakpoints.values.sm,
          m: "0 auto",
        }}
      >
        <Stack spacing={2}>
          <BirthdayBox title="Sinh nhật hôm nay">
            <BirthdayItem name="Thế Vỹ" />
          </BirthdayBox>

          <BirthdayBox title="Sinh nhật gần đây">
            <Stack spacing={2}>
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
              />
            </Stack>
          </BirthdayBox>

          <BirthdayBox title="Sinh nhật sắp tới">
            <Stack spacing={2}>
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                disabledInput={true}
              />
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                disabledInput={true}
              />
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                disabledInput={true}
              />
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                disabledInput={true}
              />
            </Stack>
          </BirthdayBox>
        </Stack>
      </Box>
    </Box>
  );
};

export default BirthdayFriend;
