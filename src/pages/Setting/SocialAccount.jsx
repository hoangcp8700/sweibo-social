import React from "react";
import { Box, Stack, TextField, Typography, Divider } from "@mui/material";
import { MButton } from "components/MUI";
import { icons } from "constants";

import { useAuth } from "hooks";

const SocialAccount = () => {
  const { handleGetSocial, user } = useAuth();

  const [socials, setSocials] = React.useState([]);

  const handleGetSocialCustom = async () => {
    const response = await handleGetSocial();
    console.log("responseresponse", response);
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
      </Box>
    </Box>
  );
};

export default SocialAccount;
