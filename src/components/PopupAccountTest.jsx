import * as React from "react";

import {
  Typography,
  Box,
  Dialog,
  Paper,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { icons } from "constants";
import { MButton } from "./MUI";

const PopupAccountTest = (props) => {
  const { open, onClose, accounts, onClick } = props;
  return (
    <Dialog fullWidth={true} maxWidth="mobile" open={open} onClose={onClose}>
      <Paper sx={{ bgcolor: "background.navbar" }}>
        <Box sx={{ position: "relative" }}>
          <DialogTitle sx={{ textAlign: "center" }}>
            {"Tài khoản test"}
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
        </Box>

        <DialogContent>
          <Stack>
            {accounts.map((item, index) => (
              <MButton
                key={item.id}
                sx={{ py: 1.5 }}
                {...props}
                onClick={() => onClick(item?.id)}
              >
                <Typography variant="body2" sx={{ color: "common.black" }}>
                  Tài khoản {index + 1}
                </Typography>
              </MButton>
            ))}
          </Stack>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default PopupAccountTest;
