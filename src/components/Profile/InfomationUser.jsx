import React from "react";
import {
  Box,
  Paper,
  Stack,
  IconButton,
  Divider,
  Typography,
  Chip,
} from "@mui/material";
import { MTextIcon } from "components/MUI";
import { icons, data } from "constants";
import PopupEditProfile from "./PopupEditProfile";
import { LoadingEllipsis } from "components";

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
  const { isAuth, user, handleSubmitEditProfile } = props;
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggleIsEditProfile = () => setIsEditProfile(!isEditProfile);

  const handleSubmitForm = async (form) => {
    setIsLoading(true);
    await handleSubmitEditProfile(form);
    setIsLoading(false);
    handleToggleIsEditProfile();
  };

  return (
    <Paper
      sx={{
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minBase,
        p: 2,
      }}
    >
      {isLoading ? (
        <LoadingEllipsis sx={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      ) : (
        ""
      )}

      <PopupEditProfile
        userContact={user?.contact}
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
            {user?.contact?.bio}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Stack>
          {user?.contact?.school ? (
            <MTextIconCustom
              startIcon={icons.SchoolOutlinedIcon}
              label={`Học tại ${user?.contact?.school} `}
            />
          ) : (
            ""
          )}
          {user?.contact?.address ? (
            <MTextIconCustom
              startIcon={icons.LocationCityIcon}
              label={`Đến từ ${user?.contact?.address} `}
            />
          ) : (
            ""
          )}
          {user?.contact?.relationshipStatus
            ? data.relationshipStatus
                .filter(
                  (item) => user?.contact?.relationshipStatus === item.value
                )
                .map((item) => (
                  <MTextIconCustom
                    startIcon={item.icon}
                    label={`${item?.label}`}
                  />
                ))
            : ""}

          <MTextIconCustom
            startIcon={icons.WifiIcon}
            label={"Có 2.354 người theo dõi"}
          />

          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: 1 }}>
            {data.favorites
              .filter((item) => user?.contact?.favorites?.includes(item.value))
              .map((item) => (
                <Chip
                  sx={{
                    pl: 1,
                    "& .MuiSvgIcon-root ": {
                      fontSize: 16,
                    },
                  }}
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  variant="outlined"
                />
              ))}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default InfomationUser;
