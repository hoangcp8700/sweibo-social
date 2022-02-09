import React from "react";
import queryString from "query-string";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useAuth } from "hooks";
import { LoadingScreen } from "components";
import { PATH_AUTH, PATH_PAGE } from "constants/paths";

const OAuth2 = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();

  React.useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (!parsed?.token || !params?.provider || parsed.token.length < 150)
      return navigate(PATH_AUTH.login.path);
    setSession(parsed?.token);

    setTimeout(() => {
      navigate(PATH_PAGE.home.path);
    }, 1000);
  }, [params, location, navigate, setSession]);

  return (
    <Box>
      <Typography variant="h4" align="center">
        Đăng nhập tài khoản qua {params?.provider} thành công
      </Typography>
      <LoadingScreen />
    </Box>
  );
};

export default OAuth2;
