import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { PATH_PAGE } from "constants/paths";
import { LoadingScreen } from "components";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const navigate = useNavigate();

  const { isAuth } = useAuth();
  const { isLoading, handleIsLoadingUser } = useAuth();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) return navigate(PATH_PAGE.home.path);
      handleIsLoadingUser(false);
    };
    isAuth();
  }, [pathname]);

  if (isAuth) {
    return <Navigate to={PATH_PAGE.home.path} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
}
