import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSelector, useDispatch } from "react-redux";

const useUser = () => {
  const dispatch = useDispatch();

  const userSocial = useSelector((state) => state.user.profile);

  const handleGetUserByEmail = async (email) => {
    try {
      const response = await axios.get(`routes.users().users?email=${email}`);
      console.log("handleGetUserByEmail", response);
    } catch (error) {
      console.log("err", error);
    }
  };
  return { userSocial, handleGetUserByEmail };
};

export default useUser;
