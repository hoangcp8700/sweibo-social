// eslint-disable-next-line import/no-anonymous-default-export

const authentication = () => {
  return {
    user: "/auth/user",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    verifyCode: "/auth/verify-code",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    updateAvatar: "/users/avatar/update",
  };
};

const users = (id) => {
  return {
    edit: `/users/${id}`,
    users: `/users`,
    albums: `/users/albums`,
  };
};
export default {
  authentication,
  users,
};
