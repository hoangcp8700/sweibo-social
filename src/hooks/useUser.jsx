import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { SET_PROFILE } from "stores/UserSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const userSocial = useSelector((state) => state.user.profile);

  const handleGetUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${routes.users().users}?email=${email}`
      );
      console.log("handleGetUserByEmail", response);
      // dispatch(SET_PROFILE(response.data.data));
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleGetAlbums = async (page = 1, email) => {
    try {
      const link = `?page=${page}${email ? `&email=${email}` : ""}`;
      const response = await axios.get(`${routes.users().albums}${link}`);
      console.log("handleGetAlbums", response);
      // dispatch(SET_PROFILE(response.data.data));
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleSubmitEditProfile = async (userID, form) => {
    try {
      const response = await axios.put(
        routes.users(userID).updateContact,
        form
      );
      return response.data.contact;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleGetFriends = async (page = 1, type) => {
    try {
      const response = await axios.get(routes.friends()[type]);
      console.log("handleGetFriends", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  return {
    userSocial,
    handleGetUserByEmail,
    handleGetAlbums,
    handleSubmitEditProfile,
    handleGetFriends,
  };
};

export default useUser;
