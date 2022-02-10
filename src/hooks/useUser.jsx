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

  return { userSocial, handleGetUserByEmail, handleGetAlbums };
};

export default useUser;
