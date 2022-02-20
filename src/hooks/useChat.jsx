import axios from "utils/axios";
import routes from "api/apiRoutes";

const useChat = () => {
  const handleGetRooms = async (page = 1) => {
    try {
      const link = `?page=${page}`;
      const response = await axios.get(`${routes.rooms().get}${link}`);
      console.log("handleGetRooms", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  const handleGetRoomByID = async (roomID) => {
    try {
      const response = await axios.get(`${routes.rooms(roomID).getByID}`);
      console.log("handleGetRoomByID", response);
      // dispatch(SET_PROFILE(response.data.data));
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleAddRoom = async (form) => {
    try {
      const response = await axios.post(routes.rooms().get, form);
      console.log("handleAddRoom", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleUpdateRoom = async (form, roomID) => {
    try {
      const response = await axios.put(routes.rooms(roomID).getByID, form);
      console.log("handleUpdateRoom", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleDeleteRoom = async (roomID) => {
    try {
      const response = await axios.delete(routes.rooms(roomID).getByID);
      console.log("handleDeleteRoom", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  return {
    handleGetRooms,
    handleGetRoomByID,
    handleAddRoom,
    handleUpdateRoom,
    handleDeleteRoom,
  };
};

export default useChat;
