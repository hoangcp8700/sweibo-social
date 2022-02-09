import React from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

// hooks
import { useAuth } from "hooks";
import { PATH_AUTH } from "constants/paths";
import { LoadingScreen } from "components";

// ----------------------------------------------------------------------

const requestedLocation = localStorage.getItem("path");

//  const { isAuth } = useAuth();

export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { isAuth, isLoading, handleAuthenticated } = useAuth();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const getAuth = async () => {
      if (isAuth) return;
      const response = await handleAuthenticated();
      if (!response) {
        localStorage.setItem("path", pathname);
        return navigate(PATH_AUTH.login.path);
      }

      if (requestedLocation && requestedLocation !== pathname) {
        localStorage.removeItem("path");
        return <Navigate to={requestedLocation} />;
      }
    };
    getAuth();
  }, [pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
