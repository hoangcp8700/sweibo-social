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
  const { isLoading, handleAuthenticated } = useAuth();
  const { pathname } = useLocation();

  console.log("path", pathname);

  React.useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await handleAuthenticated();
        if (!response) {
          console.log("!response", pathname, requestedLocation);

          // if (pathname === requestedLocation) {
          //   localStorage.removeItem("path");
          //   return <Navigate to={PATH_PAGE.root.path} />;
          // }

          // if (pathname !== requestedLocation) {
          //   localStorage.setItem("path", pathname);
          //   return navigate(PATH_AUTH.login.path);
          // }
          localStorage.setItem("path", pathname);
          return navigate(PATH_AUTH.login.path);
        }

        if (requestedLocation && requestedLocation !== pathname) {
          localStorage.removeItem("path");
          return <Navigate to={requestedLocation} />;
        }
      } catch (error) {
        console.log("err", error);
      }
    };
    isAuth();
  }, [pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
