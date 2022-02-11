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
      console.log("handleCreatePost ", response);
    } catch (error) {
      console.log("err", error);
    }
  };
  return { handleCreatePost };
};

export default usePost;
