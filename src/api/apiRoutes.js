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

const friends = (id) => {
  return {
    active: `/friends/${id}/active`,
    accept: `/friends/${id}/accept`,
    waiting: `/friends/${id}/waiting`,
    add: `/friends/add`,
    detail: `/friends/${id}/detail`,
    update: `/friends/${id}/update`,
    delete: `/friends/${id}/delete`,
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

const rooms = (roomID) => {
  return {
    get: `/rooms`,
    getByID: `/rooms/${roomID}`,
  };
};

const pariticipants = (roomID, messageID) => {
  return {
    get: `/rooms/${roomID}/participants`,
    getUsers: `/rooms/${roomID}/participants/all-users`,
  };
};

const messages = (roomID, messageID) => {
  return {
    get: `/rooms/${roomID}/messages`,
    getByID: `/rooms/${roomID}/messages/${messageID}`,
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
  rooms,
  messages,
  pariticipants,
};
