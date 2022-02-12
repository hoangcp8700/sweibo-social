import React from "react";
import axios from "utils/axios";
import routes from "api/apiRoutes";

const usePost = () => {
  const handleCreatePost = async (form) => {
    try {
      const formData = await new FormData();
      await Object.keys(form).map((key) => {
        if (key === "files") {
          return form[key].map((item) => formData.append(key, item));
        }
        return formData.append(key, form[key]);
      });

      const response = await axios.post(routes.posts().create, formData);
      return response.data.data;
      console.log("handleCreatePost ", response);
    } catch (error) {
      console.log("err", error);
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
  return { handleCreatePost, handleGetPostUser, handleGetPostAll };
};

export default usePost;
