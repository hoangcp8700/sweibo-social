import axios from "utils/axios";
import routes from "api/apiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { SET_PROFILE } from "stores/UserSlice";

const useUser = () => {
  const dispatch = useDispatch();

  const userClient = useSelector((state) => state.user.profile);

  const handleUpdateUserClient = (data = null) => {
    dispatch(SET_PROFILE(data));
  };

  const handleGetUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${routes.users().users}?email=${email}`
      );
      console.log("handleGetUserByEmail", response);

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

  const handleGetUserExeptToMe = async (page = 1, params) => {
    try {
      const link = `?page=${page}${params || ""}`;
      const response = await axios.get(
        `${routes.users().usersExceptToMe}${link}`
      );
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  // ----- friend ------------------------------

  const handleGetFriends = async (page = 1, type, userID) => {
    try {
      const response = await axios.get(routes.friends(userID)[type]);
      console.log("handleGetFriends", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleGetFriendRelationship = async (targetID) => {
    try {
      const response = await axios.get(routes.friends(targetID).detail);
      console.log("handleGetFriendRelationship", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleAddFriend = async (targetID) => {
    try {
      const response = await axios.post(routes.friends(targetID).add, {
        targetID,
      });
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleUpdateStatusFriend = async (friendID) => {
    try {
      const response = await axios.get(routes.friends(friendID).update);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  const handleDeleteFriend = async (friendID) => {
    try {
      const response = await axios.delete(routes.friends(friendID).delete);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  return {
    userClient,
    handleGetUserExeptToMe,
    handleUpdateUserClient,
    handleGetUserByEmail,
    handleGetAlbums,
    handleSubmitEditProfile,
    handleGetFriends,
    handleUpdateStatusFriend,
    handleDeleteFriend,
    handleAddFriend,
    handleGetFriendRelationship,
  };
};

export default useUser;
