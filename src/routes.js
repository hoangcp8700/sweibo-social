import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

// layouts
import MainLayout from "components/layouts/LayoutMain";
import MainAuthenticationLayout from "components/layouts/LayoutAuthentication";

// guards
import GuestGuard from "guards/GuestGuard";
import AuthGuard from "guards/AuthGuard";

// components
import { LoadingPage } from "components";

// ----------------------------------------------------------------------
import { PATH_AUTH, PATH_PAGE } from "constants/paths";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

const routes = () => {
  return [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: PATH_PAGE.home.link,
          element: <HomePage />,
          children: [{ path: "", element: <AllPostPage /> }],
        },

        {
          path: PATH_PAGE.setting.link,
          element: <SettingPage />,
          children: [
            { path: "", element: <GeneralSettingPage /> },
            { path: "change-password", element: <ChangePasswordPage /> },
            { path: "socials", element: <SocialAccountPage /> },
          ],
        },
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
        {
          path: PATH_PAGE.save.link,
          element: <SavePage />,
          children: [
            { path: "", element: <Navigate to="all" replace /> },
            { path: ":id", element: <AllSavePage /> },
            { path: "all", element: <AllSavePage /> },
            { path: ":id/collections/:name", element: <CollectionSavePage /> },
            { path: "collections/:name", element: <CollectionSavePage /> },
          ],
        },
        { path: PATH_PAGE.chat.link, element: <ChatPage /> },
        {
          path: `${PATH_PAGE.profile.link}`,
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
    {
      path: PATH_AUTH.root.path,
      element: (
        <GuestGuard>
          <MainAuthenticationLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: PATH_AUTH.login.path,
          element: <LoginPage />,
        },

        { path: PATH_AUTH.register.path, element: <RegisterPage /> },
        {
          path: PATH_AUTH.forgotPassword.path,
          element: <ForgotPasswordPage />,
        },
        {
          path: PATH_AUTH.verify.path,
          element: <VerifyCodePage />,
        },
        {
          path: `${PATH_AUTH.verify.path}/:email`,
          element: <VerifyCodePage />,
        },

        {
          path: `${PATH_AUTH.resetPassword.path}/:token`,
          element: <ResetPasswordPage />,
        },
      ],
    },
    {
      path: "auth/:provider/callback",
      element: <OAuth2CallbackSuccessPage />,
    },
    {
      path: "auth/:provider/failed",
      element: <OAuth2CallbackFailedPage />,
    },
  ];
};

export default function Router() {
  return useRoutes(routes());
}

// -------------------------------import--------------------------
// -------------------------------import--------------------------
// -------------------------------import--------------------------
// -------------------------------import--------------------------
const HomePage = Loadable(lazy(() => import("pages/Home/")));
const AllPostPage = Loadable(lazy(() => import("pages/Home/AllPost")));

// setting
const SettingPage = Loadable(lazy(() => import("pages/Setting/")));
const GeneralSettingPage = Loadable(
  lazy(() => import("pages/Setting/GeneralSetting"))
);
const ChangePasswordPage = Loadable(
  lazy(() => import("pages/Setting/ChangePassword"))
);
const SocialAccountPage = Loadable(
  lazy(() => import("pages/Setting/SocialAccount"))
);

const ChatPage = Loadable(lazy(() => import("pages/Chat")));

// save
const SavePage = Loadable(lazy(() => import("pages/Save")));
const AllSavePage = Loadable(lazy(() => import("pages/Save/AllSave")));
const CollectionSavePage = Loadable(
  lazy(() => import("pages/Save/CollectionSave"))
);

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

// authentication
const LoginPage = Loadable(lazy(() => import("pages/Authentication/Login")));
const RegisterPage = Loadable(
  lazy(() => import("pages/Authentication/Register"))
);
const ForgotPasswordPage = Loadable(
  lazy(() => import("pages/Authentication/ForgotPassword"))
);
const VerifyCodePage = Loadable(
  lazy(() => import("pages/Authentication/VerifyCode"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("pages/Authentication/ResetPassword"))
);
const OAuth2CallbackSuccessPage = Loadable(
  lazy(() => import("pages/Authentication/OAuth2CallbackSuccess"))
);
const OAuth2CallbackFailedPage = Loadable(
  lazy(() => import("pages/Authentication/OAuth2CallbackFailed"))
);

const Error404Page = Loadable(lazy(() => import("pages/Error404")));
