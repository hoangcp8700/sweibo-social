import React from "react";
import { Box, Stack, IconButton, Typography, Divider } from "@mui/material";
import { icons } from "constants";

import { useAuth } from "hooks";

const listIconSocials = [
  { label: "google", icon: icons.GoogleIcon },
  { label: "facebook", icon: icons.FacebookIcon },
  { label: "github", icon: icons.GitHubIcon },
];

const ItemSocial = (props) => {
  const { item, social } = props;
  console.log("social", social);
  return (
    <Stack alignItems="center" sx={{ gap: 1 }}>
      <IconButton
        sx={{ bgcolor: "background.opacity", "& svg": { fontSize: 68 } }}
      >
        {social?.icon}
      </IconButton>
      <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
        {item?.providerName}
      </Typography>
    </Stack>
  );
};
const SocialAccount = () => {
  const { handleGetSocial, user } = useAuth();

  const [socials, setSocials] = React.useState([]);

  const handleGetSocialCustom = async () => {
    const response = await handleGetSocial();
    if (response) {
      setSocials(response);
    }
  };
  React.useEffect(() => {
    if (!user?._id) return;
    handleGetSocialCustom();
  }, [user]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.md,
        m: "0 auto",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Tài khoản đã liên kết với mạng xã hội
        </Typography>
        <Divider />

        <Stack direction="row" alignItems="center" spacing={4} sx={{ mt: 2 }}>
          {socials.length ? (
            socials.map((item) => {
              const social = listIconSocials.filter(
                (social) => social.label === item?.providerName
              );
              return (
                <ItemSocial key={item?._id} item={item} social={social[0]} />
              );
            })
          ) : (
            <Typography variant="subtitle2">Chưa liên kết</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default SocialAccount;
