import React from "react";
import { Box, Paper, Stack, Divider, Typography } from "@mui/material";
import { MTextIcon } from "./MUI";
import { icons } from "constants";

const MTextIconCustom = (props) => {
  return (
    <MTextIcon
      {...props}
      iconProps={{
        sx: { "& svg": { fill: (theme) => theme.palette.text.primary } },
      }}
      textProps={{
        variant: "body2",
        sx: { cursor: "context-menu" },
      }}
    />
  );
};
const InfomationUser = () => {
  return (
    <Paper
      sx={{
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minBase,
        p: 2,
      }}
    >
      <Stack>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Giới thiệu
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Love family ❤️ Do you want to be my family?
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Stack>
          <MTextIconCustom
            startIcon={icons.HomeOutlineIcon}
            label={"Làm việc tại Trường THCS & THPT Phạm Ngũ Lão "}
          />
          <MTextIconCustom
            startIcon={icons.HomeOutlineIcon}
            label={"Từng học tại Trường THCS Nguyễn Hiền "}
          />
          <MTextIconCustom
            startIcon={icons.HomeOutlineIcon}
            label={" Đến từ Hưng Yên"}
          />
          <MTextIconCustom
            startIcon={icons.HomeOutlineIcon}
            label={"Độc thân"}
          />
          <MTextIconCustom
            startIcon={icons.HomeOutlineIcon}
            label={"Có 2.354 người theo dõi"}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default InfomationUser;
