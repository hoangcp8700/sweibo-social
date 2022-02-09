import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { LoadingScreen } from "components";
import { PATH_AUTH } from "constants/paths";

const OAuth2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate(PATH_AUTH.login.path);
    }, 2000);
  }, [location, navigate]);

  return (
    <Box>
      <Typography variant="h4" align="center">
        Đăng nhập không thành công
      </Typography>
      <LoadingScreen />
    </Box>
  );
};

export default OAuth2;
