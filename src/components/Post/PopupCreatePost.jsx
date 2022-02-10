import * as React from "react";
import { useSnackbar } from "notistack";

import {
  Stack,
  Typography,
  Box,
  Avatar,
  Dialog,
  Paper,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  TextareaAutosize,
  useTheme,
  DialogActions,
  styled,
} from "@mui/material";
import { icons } from "constants";
import { useAuth } from "hooks";
import handleUploadFile from "utils/uploadFile";

import { MButton, MSelect } from "components/MUI";
import { LoadingEllipsisElement } from "components";
import { EmojiPicker } from "components";
import ImageGroupCreatePost from "./ImageGroupCreatePost";

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  "& svg": {
    fontSize: 18,
    fill: theme.palette.background.opacity3,
  },
}));

const status = [
  { label: "Công khai", value: "Public", icon: icons.PublicIcon },
  { label: "Chỉ mình tôi", value: "Pravite", icon: icons.LockOpenIcon },
];

const initialize = {
  content: "",
  status: "",
};

export default function PopupCreatePost(props) {
  const { open, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const [form, setForm] = React.useState(initialize);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openEmoji, setOpenEmoji] = React.useState(false);

  const anchorRef = React.useRef();
  const uploadAvatarRef = React.useRef();

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    console.log("form", form);
  };

  const handleToggleOpenEmoji = () => setOpenEmoji(!openEmoji);

  const handleUploadFilePost = async (e) => {
    setIsLoading(true);
    try {
      const response = await handleUploadFile(e);
      if (response.error) {
        setIsLoading(false);
        return enqueueSnackbar(response.message, { variant: "error" });
      }
      setTimeout(() => {
        console.log("response", response);
        setForm({ ...form, files: response });
        // const newAvatar = await handleUploadAvatar(response);
        // setAvatarDetail(newAvatar);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log("err", error);
      setIsLoading(false);
    }
  };
  return (
    <Dialog fullWidth={true} maxWidth="mobile" open={open} onClose={onClose}>
      {openEmoji ? (
        <EmojiPicker
          anchor={anchorRef}
          open={openEmoji}
          handleClose={handleToggleOpenEmoji}
          handleSubmit={(value) =>
            setForm({
              ...form,
              content: `${form.content}${value.emoji}`,
            })
          }
        />
      ) : (
        ""
      )}
      <Paper sx={{ bgcolor: "background.navbar" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>Tạo bài viết</DialogTitle>
          <Divider />
          <Paper
            elevation={5}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "background.opacity2",
              borderRadius: "50%",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                "& svg": {
                  fill: (theme) => theme.palette.text.primary,
                  fontSize: 14,
                },
              }}
            >
              {icons.CloseIcon}
            </IconButton>
          </Paper>
        </Box>

        <DialogContent sx={{ minHeight: 480 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Avatar sx={{ width: 48, height: 48 }} src={user?.avatar?.url} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">
                {user?.firstName} {user?.lastName}
              </Typography>

              <MSelect
                name="status"
                placeholder="Trạng thái"
                lists={status}
                value={form?.status}
                onChange={handleChangeForm}
                sx={{ "& .MuiSelect-select": { py: 0.5 } }}
              />
            </Stack>
          </Stack>
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              sx={{ p: 1 }}
            >
              <Typography variant="body2">Thêm vào bài viết</Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <IconButtonStyle onClick={() => setForm(initialize)}>
                  {icons.ReplayIcon}
                </IconButtonStyle>
                <IconButtonStyle
                  onClick={() => uploadAvatarRef.current.click()}
                >
                  {icons.PhotoIcon}
                </IconButtonStyle>

                <input
                  type="file"
                  accept="image/*"
                  ref={uploadAvatarRef}
                  style={{ display: "none" }}
                  onChange={handleUploadFilePost}
                  multiple
                />
                <IconButtonStyle
                  ref={anchorRef}
                  onClick={handleToggleOpenEmoji}
                >
                  {icons.EmojiEmotionsIcon}
                </IconButtonStyle>
              </Stack>
            </Stack>
          </Box>
          <TextareaAutosize
            maxRows={form?.files?.length ? 13 : 20}
            placeholder="Bạn đang nghĩ gì?"
            style={{
              width: "100%",
              fontSize: 16,
              background: "transparent",
              outline: "none",
              border: "none",
              resize: "none",
              fontFamily: "Public Sans,sans-serif",
              color: user?.settings?.isDarkMode ? "#fff" : "#000",
            }}
            value={form?.content}
            name="content"
            onChange={handleChangeForm}
          />
          {isLoading ? (
            <Box sx={{ position: "absolute", bottom: 50, width: "90%" }}>
              <LoadingEllipsisElement />
            </Box>
          ) : (
            ""
          )}
          {form?.files?.length ? <ImageGroupCreatePost /> : ""}
        </DialogContent>

        <DialogActions>
          <MButton
            fullWidth
            disabled={!form?.content || !form?.status}
            onClick={handleSubmit}
            variant="contained"
          >
            Đăng
          </MButton>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
