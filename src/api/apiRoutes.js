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
    deleteAvatar: "/users/avatar/delete",
    updateThumbnail: "/users/thumbnail/update",
    deleteThumbnail: "/users/thumbnail/delete",
  };
};

const users = (id) => {
  return {
    edit: `/users/${id}`,
    users: `/users`,
    albums: `/users/albums`,
    updateContact: `/users/${id}/contact`,
  };
};

const friends = () => {
  return {
    active: `/friends/active`,
    accept: `/friends/accept`,
    waiting: `/friends/waiting`,
  };
};
const posts = (id) => {
  return {
    create: `/posts/add`,
    getAll: `/posts`,
    getPostsOfFriend: `/posts/friends`,
    getPostUser: `/posts/user`,
    byID: `/posts/${id}`,
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
    action: `/posts/${postID}/likes/action`,
    get: `/posts/${postID}/likes/lists`,
  };
};
export default {
  authentication,
  users,
  posts,
  comments,
  likes,
  friends,
};
