import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Paper,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { icons } from "constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupShareOfPost(props) {
  const { open, postID, onClose } = props;

  React.useEffect(() => {
    if (!open || postID) return;
    const getUserLike = () => {
      try {
        // const response  = await
      } catch (error) {
        console.log("err", error);
      }
    };
    getUserLike();
  }, [open, postID]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth="mobile"
    >
      <Paper sx={{ bgcolor: "background.navbar" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>Tất cả</DialogTitle>
          <Divider />
          {/* btn close */}
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
          <DialogContentText>share</DialogContentText>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
