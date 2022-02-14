import React from "react";
import axios from "utils/axios";
import routes from "api/apiRoutes";

const usePost = () => {
  const handleCreatePost = async (form) => {
    try {
      const formData = await new FormData();
      await Object.keys(form).map((key) => {
        if (key === "files" && form[key].length) {
          return form[key].map((item) => formData.append(key, item));
        }
        return formData.append(key, form[key]);
      });

      const response = await axios.post(routes.posts().create, formData);
      return response.data.data;
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
      const link = `?page=${page}`;
      const response = await axios.get(`${routes.posts().getAll}${link}`);
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

  return {
    handleCreatePost,
    handleGetPostUser,
    handleGetPostAll,
    handleCreateComment,
  };
};

export default usePost;
