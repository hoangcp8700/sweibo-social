import React from "react";
import {
  Paper,
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import { MButton } from "../MUI";
import { icons } from "constants";
import { lineClampStyle } from "utils/lineClampStyle";

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.opacity1,
  borderRadius: theme.sizes.base,
  "& svg": { fill: theme.palette.text.primary, fontSize: 18 },
}));

const SaveItem = (props) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        sx={{
          gap: 2,
          flexDirection: { xs: "column", mobile: "row" },
          alignItems: { xs: "center", mobile: "flex-start", sm: "stretch" },
          justifyContent: { xs: "center", sm: "" },
        }}
      >
        <Box>
          <Avatar
            variant="rounded"
            sx={{
              width: { xs: 100, mobile: 120, sm: 160 },
              height: { xs: 100, mobile: 120, sm: "100%" },
            }}
          />
        </Box>
        <Stack spacing={1}>
          <Stack>
            <Typography
              variant="h5"
              sx={{
                ...lineClampStyle(2),
                textAlign: { xs: "center", mobile: "left" },
              }}
            >
              Nhà ống 4x18 trong ngõ nhỏ, luôn sáng thoáng nhờ “để dành” ⅓ diện
              tích cho giếng trời
            </Typography>

            <Box
              sx={{
                mt: -0.5,
                width: "100%",
                textAlign: { xs: "center", mobile: "left" },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Đã lưu vào bộ sưu tập{" "}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                }}
              >
                Nhà
              </Typography>
            </Box>

            <Box
              sx={{
                mt: -0.5,
                width: "100%",
                textAlign: { xs: "center", mobile: "left" },
              }}
            >
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "text.secondary" }}
              >
                Đã lưu từ bài viết của{" "}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 700 }}
              >
                Happynest - Cộng đồng yêu nhà đẹp
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            alignItems="stretch"
            sx={{
              gap: 1,
              justifyContent: { xs: "center", mobile: "flex-start" },
            }}
          >
            <MButton
              variant="contained"
              sx={{
                bgcolor: "background.opacity1",
                "&:hover": {
                  bgcolor: "background.opacity2",
                },
                borderRadius: (theme) => theme.sizes.minBase,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ ...lineClampStyle(1), color: "text.primary" }}
              >
                Thêm vào bộ sưu tập
              </Typography>
            </MButton>
            <IconButtonStyle>{icons.ShareIcon}</IconButtonStyle>
            <IconButtonStyle>{icons.BookmarkRemoveIcon}</IconButtonStyle>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SaveItem;
