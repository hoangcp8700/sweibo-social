import React from "react";
import {
  Paper,
  Stack,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { icons } from "constants";

const BirthdayToday = () => {
  return (
    <Paper sx={{ borderRadius: (theme) => theme.sizes.minBase }}>
      <Stack sx={{ py: 1, px: 2, position: "relative" }} spacing={1}>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{
              "& svg": { fill: (theme) => theme.palette.primary.main },
              p: 0,
            }}
          >
            {icons.CakeIcon}
          </IconButton>
          <Typography variant="subtitle2" sx={{ pt: 1 }}>
            Sinh nhật
          </Typography>
        </Stack>

        <Button
          sx={{
            textTransform: "inherit",
            textAlign: "left",
            justifyContent: "flex-start",
            color: "text.primary",
            gap: 0.5,
            borderRadius: (theme) => theme.sizes.minBase,
            p: 1,
            "&:hover": {
              bgcolor: "background.opacity",
            },
          }}
        >
          <Typography variant="body2">
            Hôm nay là sinh nhật của <b> Lan Phuong</b>
          </Typography>
        </Button>

        <Box sx={{ position: "absolute", top: -5, right: 5 }}>
          <IconButton sx={{ "& svg": { fontSize: 18 } }}>
            {icons.DeleteIcon}
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
};

export default BirthdayToday;
