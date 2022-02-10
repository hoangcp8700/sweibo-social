import * as React from "react";
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
} from "@mui/material";
import { icons } from "constants";
import { MButton, MSelect } from "components/MUI";
import { LoadingEllipsisElement } from "components";
import { useAuth } from "hooks";

const status = [
  { label: "Công khai", value: "Public", icon: icons.PublicIcon },
  { label: "Chỉ mình tôi", value: "Pravite", icon: icons.LockOpenIcon },
];

const initialize = {
  content: "",
  status: "",
};

export default function PopupCreatePost(props) {
  const theme = useTheme();
  const { open, onClose } = props;
  const { user } = useAuth();
  const [form, setForm] = React.useState(initialize);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    console.log("form", form);
  };
  return (
    <Dialog fullWidth={true} maxWidth="mobile" open={open} onClose={onClose}>
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

        <DialogContent>
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
          <TextareaAutosize
            maxRows={25}
            minRows={10}
            placeholder="Bạn đang nghĩ gì?"
            style={{
              width: "100%",
              fontSize: 16,
              background: "transparent",
              outline: "none",
              border: "none",
              resize: "none",
              color: user?.settings?.isDarkMode ? "#fff" : "#000",
            }}
            value={form?.content}
            name="content"
            onChange={handleChangeForm}
          />
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
