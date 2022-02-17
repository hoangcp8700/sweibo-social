import * as React from "react";

import {
  DialogTitle,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { MButton } from "components/MUI";

export default function PopupAgainDelete(props) {
  const { open, title, label, onClose, handleAccept } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography>{label}</Typography>
      </DialogContent>

      <DialogActions>
        <MButton onClick={onClose} variant="cancel">
          Hủy bỏ
        </MButton>
        <MButton
          onClick={handleAccept}
          autoFocus
          variant="contained"
          color="primary"
        >
          Đồng ý
        </MButton>
      </DialogActions>
    </Dialog>
  );
}
