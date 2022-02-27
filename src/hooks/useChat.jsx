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
  const handleGetRoomDetail = async (roomID) => {
    try {
      const response = await axios.get(`${routes.rooms(roomID).getByID}`);
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
      return response.data.data;
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

  // ------------------ messages-----------------
  const handleGetMessagesOfRoom = async (page = 1, roomID) => {
    try {
      const link = `?page=${page}`;
      const response = await axios.get(`${routes.messages(roomID).get}${link}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  const handleAddMessage = async (form, roomID) => {
    try {
      const response = await axios.post(routes.messages(roomID).get, form);
      console.log("handleAddMessage", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleDeleteMessage = async (roomID, messageID) => {
    try {
      const response = await axios.delete(
        routes.messages(roomID, messageID).getByID
      );
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };
  // ------------------ participants -------------
  const handleGetParticipants = async (page, roomID, params) => {
    try {
      const link = `?page=${page}${params || ""}`;
      const response = await axios.get(
        `${routes.pariticipants(roomID).get}${link}`
      );
      console.log("handleGetParticipants", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleGetUsersToParticipant = async (page, roomID, params) => {
    try {
      const link = `?page=${page}${params || ""}`;
      const response = await axios.get(
        `${routes.pariticipants(roomID).getUsers}${link}`
      );
      // console.log("handleGetUsersToParticipant", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleAddMembers = async (form, roomID) => {
    try {
      const response = await axios.post(routes.pariticipants(roomID).get, form);
      console.log("handleAddMembers", response);
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleEditMember = async (form, roomID, participantID) => {
    try {
      const response = await axios.put(
        routes.pariticipants(roomID, participantID).getID,
        form
      );
      console.log("handleEditMember", response);
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  const handleDeleteParticipant = async (roomID) => {
    try {
      const response = await axios.delete(routes.pariticipants(roomID).get);
      console.log("handleDeleteParticipant", response);
      return response.data.data;
    } catch (error) {
      console.log("err", error);
      return false;
    }
  };

  return {
    handleGetRooms,
    handleGetRoomDetail,
    handleAddRoom,
    handleUpdateRoom,
    handleDeleteRoom,

    // messages
    handleGetMessagesOfRoom,
    handleAddMessage,
    handleDeleteMessage,

    // participants
    handleGetParticipants,
    handleGetUsersToParticipant,
    handleAddMembers,
    handleEditMember,
    handleDeleteParticipant,
  };
};

export default useChat;
