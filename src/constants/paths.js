function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_PAGE = "";

// ----------------------------------------------------------------------

const PATH_AUTH = {
  root: { path: ROOTS_AUTH, title: "Dashboard" },
  login: { path: path(ROOTS_AUTH, "/login"), title: "Login" },
  register: { path: path(ROOTS_AUTH, "/register"), title: "Register" },
  forgotPassword: {
    path: path(ROOTS_AUTH, "/forgot-password"),
    title: "Forgot Password",
  },
  resetPassword: {
    path: path(ROOTS_AUTH, "/reset-password"),
    title: "Reset Password",
  },
  verify: { path: path(ROOTS_AUTH, "/verify"), title: "Verify" },
};

const PATH_PAGE = {
  home: { path: path(ROOTS_PAGE, "/"), link: "", title: "Trang chủ" },
  friend: {
    path: path(ROOTS_PAGE, "/friends"),
    link: "friends",
    title: "Bạn bè",
  },
  save: { path: path(ROOTS_PAGE, "/saves"), link: "saves", title: "Đã lưu" },
  weather: {
    path: path(ROOTS_PAGE, "/weather"),
    link: "weather",
    title: "Thời tiết",
  },
  chat: {
    path: path(ROOTS_PAGE, "/chats"),
    link: "chats",
    title: "Trò chuyện",
  },
};

export { PATH_AUTH, PATH_PAGE };
