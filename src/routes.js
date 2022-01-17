import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import MainLayout from "components/layouts/LayoutMain";

// guards
// import GuestGuard from 'guards/GuestGuard'
// import AuthGuard from 'guards/AuthGuard'

// components
import { LoadingPage } from "components";

// ----------------------------------------------------------------------
import { PATH_PAGE } from "constants/paths";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: PATH_PAGE.home.link, element: <HomePage /> },
        { path: PATH_PAGE.friend.link, element: <FriendPage /> },
        { path: PATH_PAGE.save.link, element: <SavePage /> },
        { path: PATH_PAGE.chat.link, element: <ChatPage /> },
        { path: PATH_PAGE.weather.link, element: <WeatherPage /> },
        { path: "*", element: <Error404Page /> },

        // { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// import
const HomePage = Loadable(lazy(() => import("pages/Home")));
const FriendPage = Loadable(lazy(() => import("pages/Friend")));
const SavePage = Loadable(lazy(() => import("pages/Save")));
const ChatPage = Loadable(lazy(() => import("pages/Chat")));
const WeatherPage = Loadable(lazy(() => import("pages/Weather")));

const Error404Page = Loadable(lazy(() => import("pages/Error404")));
