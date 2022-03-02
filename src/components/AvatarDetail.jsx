import * as React from "react";
import {
  Stack,
  Box,
  Avatar,
  Dialog,
  Paper,
  DialogContent,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import { MButton } from "components/MUI";
import { LoadingEllipsisElement } from "components";

export default function AvatarDetail(props) {
  const {
    open,
    onClose,
    avatar,
    handleUploadAvatar,
    handleRemoveAvatar,
    isLoading,
    isAuth,
  } = props;

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <Paper
          elevation={5}
          sx={[
            (theme) => ({
              width: "100%",
              height: 550,
              bgcolor: "background.opacity2",
            }),
          ]}
        >
          {isLoading ? (
            <LoadingEllipsisElement />
          ) : (
            <img
              src={avatar}
              alt="banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 0,
              }}
            />
          )}
        </Paper>
        {isAuth ? (
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 1 }}
          >
            <MButton variant="contained" onClick={handleUploadAvatar}>
              Đổi ảnh đại diện
            </MButton>
            <MButton
              onClick={handleRemoveAvatar}
              variant="contained"
              sx={{
                bgcolor: "background.opacity2",
                color: "text.primary",
                "&:hover": {
                  bgcolor: "background.opacity2",
                  color: "text.primary",
                },
              }}
            >
              Xóa ảnh
            </MButton>
          </Stack>
        ) : (
          ""
        )}

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
              },
            }}
          >
            {icons.CloseIcon}
          </IconButton>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
