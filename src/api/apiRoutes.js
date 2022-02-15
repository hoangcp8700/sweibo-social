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

const posts = (id) => {
  return {
    create: `/posts/add`,
    getAll: `/posts`,
    getPostUser: `/posts/user`,
  };
};

const comments = (postID, commentID) => {
  return {
    get: `/posts/${postID}/comments`,
    update: `/posts/${postID}/comments/${commentID}`,
  };
};
const likes = (postID) => {
  return {
    get: `/posts/${postID}/likes/action`,
    lists: `/posts/${postID}/likes/lists`,
  };
};
export default {
  authentication,
  users,
  posts,
  comments,
  likes,
};
