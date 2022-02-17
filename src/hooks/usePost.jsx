import React from "react";
import axios from "utils/axios";
import routes from "api/apiRoutes";

const usePost = () => {
  const handleCreateOrEditPost = async (form) => {
    try {
      const { _id, ...restForm } = form;
      const formData = await new FormData();
      await Object.keys(restForm).map((key) => {
        if (key === "files" && restForm[key].length) {
          return restForm[key].map((item) => formData.append(key, item));
        }
        if (key === "listImageDelete" && restForm[key].length) {
          return restForm[key].map((item) => formData.append(key, item));
        }
        return formData.append(key, restForm[key]);
      });
      let response;
      if (!_id) {
        response = await axios.post(routes.posts().create, formData);
      } else {
        response = await axios.put(routes.posts(_id).byID, formData);
      }
      console.log("handleCreateOrEditPost", response);
      return response.data;
    } catch (error) {
      console.log("err", error.response);
      return { error: error.response.data };
    }
  };

  const handleGetPostUser = async (page = 1, email) => {
    try {
      const link = `?page=${page}${email ? `&email=${email}` : ""}`;
      const response = await axios.get(`${routes.posts().getPostUser}${link}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetPostAll = async (page = 1) => {
    try {
      const link = `?page=${page}&status=Public`;
      const response = await axios.get(`${routes.posts().getAll}${link}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetPostsOfFriend = async (page = 1) => {
    try {
      const link = `?page=${page}&status=Public`;
      const response = await axios.get(
        `${routes.posts().getPostsOfFriend}${link}`
      );
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetPostById = async (postID) => {
    try {
      const response = await axios.get(`${routes.posts().getAll}/${postID}`);
      return response.data.data;
    } catch (error) {
      console.log("err", error);
    }
  };
  const handleDeletePost = async (postID) => {
    try {
      const response = await axios.delete(`${routes.posts().getAll}/${postID}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  /// ------------------  comments

  const handleGetComments = async (page = 1, postID) => {
    try {
      const link = `?page=${page}`;
      const response = await axios.get(`${routes.comments(postID).get}${link}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleCreateComment = async (content, postID) => {
    try {
      const response = await axios.post(routes.comments(postID).get, {
        content,
      });
      return response.data.data;
    } catch (error) {
      console.log("err", error.response);
      return false;
    }
  };
  const handleSubmitEditComment = async (content, postID, commentID) => {
    try {
      const response = await axios.put(
        routes.comments(postID, commentID).update,
        {
          content,
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("err", error.response);
      return false;
    }
  };
  const handleDeleteComment = async (postID, commentID) => {
    try {
      const response = await axios.delete(
        routes.comments(postID, commentID).update
      );
      return response.data;
    } catch (error) {
      console.log("err", error.response);
      return false;
    }
  };

  // --------------------like
  const handleGetLikes = async (page = 1, postID) => {
    try {
      const link = `?page=${page}`;
      const response = await axios.get(`${routes.likes(postID).get}${link}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleToggleLike = async (postID) => {
    try {
      const response = await axios.get(routes.likes(postID).action);
      return response.data;
    } catch (error) {
      console.log("err", error.response);
      return false;
    }
  };

  return {
    handleCreateOrEditPost,
    handleGetPostUser,
    handleGetPostAll,
    handleGetPostsOfFriend,
    handleGetPostById,
    handleDeletePost,

    // comments
    handleCreateComment,
    handleGetComments,
    handleSubmitEditComment,
    handleDeleteComment,

    // like
    handleToggleLike,
    handleGetLikes,
  };
};

export default usePost;
