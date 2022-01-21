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
        {
          path: PATH_PAGE.friend.link,
          element: <FriendPage />,
          children: [
            {
              path: "",
              element: <ListFriendPage />,
              children: [
                { path: "", element: <NotFoundFriendPage /> },
                {
                  path: `${PATH_PAGE.profile.link}/:id`,
                  element: <ProfilePage />,
                  children: [
                    { path: "", element: <Navigate to="posts" replace /> },
                    { path: "posts", element: <PostProfilePage /> },
                    { path: "photos", element: <FileProfilePage /> },
                    { path: "friends", element: <FriendProfilePage /> },
                  ],
                },
              ],
            },
            { path: "invite", element: <InviteFriendPage /> },
            { path: "suggest", element: <SuggestFriendPage /> },
            { path: "birthday", element: <BirthdayFriendPage /> },
          ],
        },
        { path: PATH_PAGE.save.link, element: <SavePage /> },
        { path: PATH_PAGE.chat.link, element: <ChatPage /> },
        { path: PATH_PAGE.weather.link, element: <WeatherPage /> },
        {
          path: `${PATH_PAGE.profile.link}/:id`,
          element: <ProfilePage />,
          children: [
            {
              children: [
                { path: "", element: <Navigate to="posts" replace /> },
                { path: "posts", element: <PostProfilePage /> },
                { path: "photos", element: <FileProfilePage /> },
                { path: "friends", element: <FriendProfilePage /> },
              ],
            },
          ],
        },
        { path: "*", element: <Error404Page /> },

        // { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// import
const HomePage = Loadable(lazy(() => import("pages/Home")));
const SavePage = Loadable(lazy(() => import("pages/Save")));
const ChatPage = Loadable(lazy(() => import("pages/Chat")));
const WeatherPage = Loadable(lazy(() => import("pages/Weather")));

// friend
const FriendPage = Loadable(lazy(() => import("pages/Friend")));
const SuggestFriendPage = Loadable(
  lazy(() => import("pages/Friend/SuggestFriend"))
);
const InviteFriendPage = Loadable(
  lazy(() => import("pages/Friend/InviteFriend"))
);
// list friend
const ListFriendPage = Loadable(lazy(() => import("pages/Friend/ListFriend")));
const NotFoundFriendPage = Loadable(
  lazy(() => import("pages/Friend/ListFriend/NotFoundFriend"))
);

const BirthdayFriendPage = Loadable(
  lazy(() => import("pages/Friend/BirthdayFriend"))
);

// profile
const ProfilePage = Loadable(lazy(() => import("pages/Profile")));

const FileProfilePage = Loadable(
  lazy(() => import("pages/Profile/FileProfile"))
);
const PostProfilePage = Loadable(
  lazy(() => import("pages/Profile/PostProfile"))
);
const FriendProfilePage = Loadable(
  lazy(() => import("pages/Profile/FriendProfile"))
);

const Error404Page = Loadable(lazy(() => import("pages/Error404")));
