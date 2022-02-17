import React from "react";
import {
  Box,
  Paper,
  Stack,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import { MTextIcon } from "components/MUI";
import { icons } from "constants";
import PopupEditProfile from "./PopupEditProfile";

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
const InfomationUser = (props) => {
  const { isAuth, handleSubmitEditProfile } = props;
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggleIsEditProfile = () => setIsEditProfile(!isEditProfile);

  const handleSubmitForm = async (form) => {
    setIsLoading(true);
    await handleSubmitEditProfile(form);
    setIsLoading(false);
  };
  return (
    <Paper
      sx={{
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minBase,
        p: 2,
      }}
    >
      <PopupEditProfile
        open={isEditProfile}
        onClose={handleToggleIsEditProfile}
        onSubmit={handleSubmitForm}
      />
      <Stack>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Giới thiệu
            </Typography>
            {isAuth ? (
              <IconButton
                onClick={handleToggleIsEditProfile}
                sx={{
                  "& svg": {
                    fontSize: 16,
                    fill: (theme) => theme.palette.text.primary,
                  },
                }}
              >
                {icons.EditIcon}
              </IconButton>
            ) : (
              ""
            )}
          </Stack>
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
