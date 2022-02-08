import { Navigate } from "react-router-dom";
// hooks
import useAuth from "hooks/useAuth";
// routes
import { PATH_PAGE } from "constants/paths";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_PAGE.HOME.path} />;
  }

  return <>{children}</>;
}
