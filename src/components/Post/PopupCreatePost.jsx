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
import {
  EmojiPicker,
  LoadingEllipsisElement,
  Masonry,
  ImageLightBox,
} from "components";
import ImageGroupCreatePost from "./ImageGroupCreatePost";

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  "& svg": {
    fontSize: 18,
    fill: theme.palette.text.primary,
  },
}));

const status = [
  { label: "Công khai", value: "Public", icon: icons.PublicIcon },
  { label: "Chỉ mình tôi", value: "Private", icon: icons.LockOpenIcon },
];

const initialize = {
  content: "",
  status: "Public",
  files: [],
};

const PopupCreatePost = (props) => {
  const { open, onClose, handleSubmitPost, postEdit } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!open) return;
    if (!postEdit) return;
    setForm({
      content: postEdit?.content,
      status: postEdit?.status,
      files: postEdit?.images,
      listImageDelete: [],
      _id: postEdit?._id,
    });
    return () => {
      if (postEdit) {
        setForm(initialize);
      }
    };
  }, [open, postEdit]);

  const [form, setForm] = React.useState(initialize);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openEmoji, setOpenEmoji] = React.useState(false);
  const [openLightBox, setOpenLightBox] = React.useState(false);

  const anchorRef = React.useRef();
  const uploadPostRef = React.useRef();

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true);
    const response = await handleSubmitPost({
      ...form,
      files: form?.files?.length
        ? form.files.filter((item) => item.file).map((item) => item.file)
        : [],
    });
    setIsSubmitting(false);
    onClose();
    if (response) {
      await setForm(initialize);
    }
  }, [form, handleSubmitPost]);

  const handleToggleOpenEmoji = () => setOpenEmoji(!openEmoji);

  const handleToggleOpenLightBox = React.useCallback((value) => {
    setOpenLightBox(value);
  }, []);

  const handleUploadFilePost = React.useCallback(
    async (e) => {
      setIsLoading(true);
      try {
        const response = await handleUploadFile(e, "post");
        if (response.error) {
          setIsLoading(false);
          return enqueueSnackbar(response.message, { variant: "error" });
        }

        setTimeout(() => {
          setForm({
            ...form,
            files: [...form.files, ...response],
          });

          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log("err", error);
        setIsLoading(false);
      }
    },
    [enqueueSnackbar, form]
  );

  const handleDeleteFile = (publicID) => {
    const newFiles = form?.files?.filter(
      (item) => item?.public_id !== publicID
    );
    if (form?._id) {
      return setForm({
        ...form,
        files: newFiles,
        listImageDelete: [publicID, ...form?.listImageDelete],
      });
    }
    setForm({ ...form, files: newFiles });
  };

  const textSubmit = !form?._id ? "Đăng" : "Sửa";
  const textHandleSubmit =
    isSubmitting && !form?._id ? "Đăng tải bài viết" : "Chờ vài giây...";

  return (
    <>
      {openLightBox && form?.files?.length ? (
        <ImageLightBox
          open={openLightBox}
          onClose={() => handleToggleOpenLightBox(false)}
          images={form.files}
        />
      ) : (
        ""
      )}
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
            <DialogTitle sx={{ textAlign: "center" }}>
              {!form?._id ? "Tạo bài viết" : "Sửa bài viết"}
            </DialogTitle>
            <Divider />

            {/* //btnclose */}
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

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ px: 3, mt: 2 }}
            >
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
          </Box>

          <DialogContent
            sx={{
              minHeight: 400,
              maxHeight: 440,
              pt: 0,
              mt: 2,
              "&::-webkit-scrollbar-track": {
                // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                bgcolor: (theme) => theme.palette.background.opacity,
              },

              "&::-webkit-scrollbar": {
                width: 10,
                backgroundColor: "transparent",
              },

              "&::-webkit-scrollbar-thumb": {
                bgcolor: (theme) => theme.palette.grey[500],
                borderRadius: "10px",
              },
            }}
          >
            <Box
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                borderRadius: 2,
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
                  <Box>
                    <IconButtonStyle
                      onClick={() => uploadPostRef.current.click()}
                    >
                      {icons.PhotoIcon}
                    </IconButtonStyle>
                    <input
                      type="file"
                      accept="image/*"
                      ref={uploadPostRef}
                      style={{ display: "none" }}
                      onChange={handleUploadFilePost}
                      multiple
                    />
                  </Box>
                  <IconButtonStyle
                    ref={anchorRef}
                    onClick={handleToggleOpenEmoji}
                  >
                    {icons.EmojiEmotionsIcon}
                  </IconButtonStyle>
                  <IconButtonStyle onClick={() => setForm(initialize)}>
                    {icons.ReplayIcon}
                  </IconButtonStyle>
                </Stack>
              </Stack>
            </Box>

            <TextareaAutosize
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
              <Box
                sx={{
                  position: "absolute",
                  bottom: 50,
                  width: "90%",
                  zIndex: 10,
                }}
              >
                <LoadingEllipsisElement />
              </Box>
            ) : (
              ""
            )}

            {/* masonry */}
            {form?.files?.length ? (
              <Box
                sx={{
                  mt: 1,
                  position: "relative",
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  overflow: "hidden",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    "&:hover": {
                      "& .btn-add-photo": {
                        display: "block",
                      },
                    },
                  }}
                >
                  <Box>
                    <Masonry
                      lists={form?.files}
                      handleToggleOpenLightBox={handleToggleOpenLightBox}
                      handleDeleteFile={handleDeleteFile}
                      isDisabledDelete={false}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 15,
                      left: 15,
                      display: "none",
                    }}
                    className="btn-add-photo"
                  >
                    <MButton
                      variant="contained"
                      startIcon={icons.AddPhotoIcon}
                      sx={{
                        fontSize: 12,
                        "& svg": { fontSize: "14px!important" },
                      }}
                      onClick={() => {
                        uploadPostRef.current.click();
                      }}
                    >
                      Thêm ảnh
                    </MButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogActions>
            <MButton
              fullWidth
              disabled={
                (!form?.content && !form?.files?.length) ||
                !form?.status ||
                isSubmitting
              }
              onClick={handleSubmit}
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? textHandleSubmit : textSubmit}
            </MButton>
          </DialogActions>
        </Paper>
      </Dialog>
    </>
  );
};

export default PopupCreatePost;
