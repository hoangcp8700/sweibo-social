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
  const { name, birthday, isText = true, onClick } = props;
  return (
    <Box>
      <Stack
        direction="row"
        alignItems={isText ? "flex-start" : "center"}
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

          {isText ? (
            <TextField
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
                      onClick={onClick}
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
  const [anchor, setAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleTargetEmoji = (e) => {
    setOpen(!open);
    if (!anchor && !open) {
      return setAnchor(e.currentTarget);
    }
  };

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
          <EmojiPicker
            anchor={anchor}
            open={open}
            handleClose={handleTargetEmoji}
            handleSubmit={(value) => console.log("value", value)}
          />

          <BirthdayBox title="Sinh nhật hôm nay">
            <BirthdayItem name="Thế Vỹ" onClick={handleTargetEmoji} />
          </BirthdayBox>

          <BirthdayBox title="Sinh nhật gần đây">
            <Stack spacing={2}>
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                onClick={handleTargetEmoji}
              />
            </Stack>
          </BirthdayBox>
          {/* 
          <BirthdayBox title="Sinh nhật sắp tới">
            <Stack spacing={2}>
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                isText={false}
              />
              <BirthdayItem
                name="Thế Vỹ"
                birthday={`1999-04-12T00:00:00.000Z`}
                isText={false}
              />
            </Stack>
          </BirthdayBox> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default BirthdayFriend;
