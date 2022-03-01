import React from "react";
import { io } from "socket.io-client";
import { useSnackbar } from "notistack";

import {
  Box,
  Stack,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  StickySidebar,
  SidebarHeader,
  RoomItem,
  BoxChat,
  InfomationChat,
  ToggleSidebar,
  HeaderChat,
  InputCreateMessage,
  LoadingEllipsisElement,
  PopupShowParticipants,
  PopupAddMember,
  PopupAgainDelete,
  PopupCreateRoom,
} from "components";
import { icons } from "constants";
import { useChat, useAuth } from "hooks";
import { MDrawer } from "components/MUI";
const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
};

const Chat = () => {
  const {
    handleGetRooms,
    handleUpdateRoom,
    handleGetRoomDetail,
    handleAddRoom,
    handleDeleteRoom,

    handleGetMessagesOfRoom,
    handleAddMessage,
    handleDeleteMessage,

    handleAddMembers,
    handleDeleteParticipant,
  } = useChat();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = useAuth();
  const [isSidebarContent, setIsSidebarContent] = React.useState(false);
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);
  const [isAddMember, setIsAddMember] = React.useState(false);
  const [isShowPariticipants, setIsShowPariticipants] = React.useState(false);
  const [actions, setActions] = React.useState({
    name: null,
    roomID: null,
  });

  const [paginateRoom, setPaginateRoom] = React.useState(initialize); // rooms
  const [paginateMessage, setPaginateMessage] = React.useState(initialize); // messages
  const [isLoading, setIsLoading] = React.useState({
    message: false,
    room: false,
  });
  const [room, setRoom] = React.useState(null);

  const boxChatRef = React.useRef();
  const socket = React.useRef();

  const handleGetRoomsCustom = async () => {
    if (!paginateRoom.hasNextPage) return;
    const response = await handleGetRooms(paginateRoom.page);

    setPaginateRoom({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginateRoom.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  const handleGetMessageCustom = React.useCallback(
    async (roomID) => {
      if (!paginateMessage.hasNextPage) return;
      setIsLoading({ ...isLoading, message: true });

      const response = await handleGetMessagesOfRoom(
        paginateMessage.page,
        roomID
      );

      console.log("get message", response);
      setPaginateMessage({
        page: response.next,
        hasNextPage: response.hasNextPage,
        data: [...paginateMessage.data, ...response.data],
        totalLength: response.totalLength,
      });

      setTimeout(() => {
        setIsLoading({ ...isLoading, message: false });
      }, 1000);
    },
    [paginateMessage, room, isLoading.message]
  );

  React.useEffect(() => {
    handleGetRoomsCustom();
    socket.current = io(process.env.REACT_APP_API_URL_SOCKET);
    console.log("socket realtime", socket);
  }, []);

  // get messages of room
  React.useEffect(() => {
    if (!room?._id) return;
    const getMessages = async () => {
      await handleGetMessageCustom(room?._id);
      boxChatRef.current.scrollTo({
        behavior: "smooth",
        top: boxChatRef.current.scrollHeight,
      });
      socket.current.emit("joinRoom", { user, roomID: room?._id });
    };
    getMessages();
  }, [room?._id]);

  // event socket
  React.useEffect(() => {
    if (!socket || !user) return;
    socket.current.emit("addUser", user?._id);
    socket.current.on("getRoom", ({ room, participants }) => {
      const connectRoom = participants.includes(user?._id);
      console.log("getRoom", room, participants, user?.email);

      if (connectRoom) {
        socket.current.emit("joinRoom", { user, roomID: room?._id });
        setPaginateRoom((prev) => ({
          ...prev,
          data: [room, ...prev.data],
          totalLength: prev.totalLength + 1,
        }));
      }
    });
    socket.current.on("getUsers", (data) => console.log("getUsers", data));
    socket.current.on("getUpdateRoom", ({ room }) => {
      console.log("getUpdateRoom", room);

      setPaginateRoom((prev) => {
        const newRoom = prev.data.map((item) => {
          if (item?._id !== room?._id) return item;
          return {
            ...item,
            title: room.title || item?.title,
            lastMessage: room.lastMessage,
            updatedAt: room.updatedAt,
          };
        });
        return {
          ...prev,
          data: newRoom,
        };
      });

      setRoom((prev) => {
        if (!prev?._id || prev?._id !== room?._id) return prev;
        return {
          ...prev,
          title: room.title || prev?.title,
          lastMessage: room.lastMessage,
          updatedAt: room.updatedAt,
        };
      });
    });

    socket.current.on("getMessage", (data) => {
      console.log("getMessage", data);

      setPaginateMessage((prev) => ({
        ...prev,
        data: [data, ...prev.data],
        totalLength: prev.totalLength + 1,
      }));

      boxChatRef?.current?.scrollTo({
        top: boxChatRef?.current?.scrollHeight,
      });
    });
  }, [user]);

  const handleToggleSidebarContent = React.useCallback(() => {
    setIsSidebarContent(!isSidebarContent);
  }, [isSidebarContent]);

  const handleToggleSidebarLeft = () => setIsSidebarLeft(!isSidebarLeft);
  const handleToggleAddMember = () => setIsAddMember(!isAddMember);

  // -------------------room---------------
  const handleToggleShowPariticipants = React.useCallback(
    () => setIsShowPariticipants(!isShowPariticipants),
    [isShowPariticipants]
  );

  const handleGetRoomByIdCustom = async (roomID, isDrawer) => {
    if (room?._id === roomID) return;

    const response = await handleGetRoomDetail(roomID);
    if (response) {
      setPaginateMessage(initialize); // reset
      setRoom(response);
    }
    if (isDrawer) {
      handleToggleSidebarLeft();
    }
  };

  const handleEditRoomCustom = async (form, roomID) => {
    const response = await handleUpdateRoom(form, roomID);
    if (response) {
      socket.current.emit("updateRoom", {
        room: response.data,
      });
      socket.current.emit("sendMessage", {
        roomID: room?._id,
        message: response.dataMessage,
      });

      enqueueSnackbar(response.message, { variant: "success" });
    }
  };
  const handleSubmitCreateRoomCustom = async (form) => {
    const response = await handleAddRoom(form);
    if (response) {
      socket.current.emit("createRoom", {
        room: response,
        participants: [...form.participants, user?._id],
      });
    }
  };

  // ----- info rooom
  const handleActions = (name, roomID = null, messageID = null) => {
    setActions({ name, roomID, messageID });
  };

  const handleDeleteParticipantCustom = async (roomID) => {
    const response = await handleDeleteParticipant(roomID);
    console.log("handleDeleteParticipantCustom", response);
    if (response) {
      socket.current.emit("updateRoom", {
        room: response.data,
      });
      socket.current.emit("sendMessage", {
        roomID: room?._id,
        message: response.dataMessage,
      });
      setRoom(null);
      const newRooms = paginateRoom.data.filter((item) => item?._id !== roomID);
      setPaginateRoom({ ...paginateRoom, data: newRooms });
      handleActions(null, null);
    }
  };

  // pariticipants
  const handleSubmitAddMembersCustom = async (form, roomID) => {
    const response = await handleAddMembers(form, roomID);
    if (response) {
      socket.current.emit("updateRoom", {
        room: response.room,
      });
      socket.current.emit("sendMessage", {
        roomID: room?._id,
        message: response.dataMessage,
      });
    }
  };

  /// -----------------add message--------------
  const handleAddMessageCustom = async (form) => {
    const response = await handleAddMessage(form, room?._id);
    if (response) {
      socket.current.emit("updateRoom", {
        room: response.room,
      });
      socket.current.emit("sendMessage", {
        roomID: room?._id,
        message: response.data,
      });
    }
  };

  const handleDeleteMessageCustom = async () => {
    const response = await handleDeleteMessage(room?._id, actions.messageID);
    if (response) {
      const newDate = paginateMessage.data.filter(
        (item) => item?._id !== actions.messageID
      );
      setPaginateMessage({
        ...paginateMessage,
        data: newDate,
        totalLength: paginateMessage.totalLength - 1,
      });
      enqueueSnackbar(response.message, { variant: "success" });
      handleActions(null, null, null);
    }
  };

  let disabled = false;
  const onGetMoreMessages = async () => {
    if (
      !disabled &&
      !isLoading.message &&
      boxChatRef.current.scrollTop <= 0 &&
      paginateMessage.hasNextPage
    ) {
      disabled = true;
      setPaginateMessage({
        ...paginateMessage,
        page: paginateMessage.page + 1,
      });
      await handleGetMessageCustom(room?._id);

      boxChatRef.current.scrollTo({
        top: boxChatRef.current.scrollHeight / paginateMessage?.page,
      });
    }
  };

  return (
    <Box
      sx={{
        overflowX: "hidden",
        height: (theme) => ({
          xs: `calc(100vh - ${
            theme.sizes.sidebarBottom + theme.sizes.header
          }px)`,
          sm2: `inherit`,
        }),
      }}
    >
      <PopupShowParticipants
        roomID={room?._id}
        open={isShowPariticipants}
        onClose={handleToggleShowPariticipants}
        user={user}
        socket={socket}
      />

      <PopupAddMember
        roomID={room?._id}
        open={isAddMember}
        user={user}
        onClose={handleToggleAddMember}
        handleSubmitAddMembers={handleSubmitAddMembersCustom}
      />

      <PopupCreateRoom
        open={actions.name === "create-room"}
        onClose={() => handleActions(null, null)}
        handleSubmitCreateRoom={handleSubmitCreateRoomCustom}
      />

      <ToggleSidebar
        isShowSidebar={isSidebarLeft}
        handleToggleSidebar={handleToggleSidebarLeft}
      />

      <PopupAgainDelete
        open={actions.name === "delete-participant"}
        onClose={() => handleActions(null, null)}
        title="Rời khỏi nhóm"
        label="Bạn đã chắc muốn rời khỏi nhóm?"
        handleAccept={() => handleDeleteParticipantCustom(actions.roomID)}
      />

      <PopupAgainDelete
        open={actions.name === "delete-message"}
        onClose={() => handleActions(null, null, null)}
        title="Xóa tin nhắn"
        label="Tin nhắn sẽ xóa vĩnh viễn ở phía bạn và những người trong nhóm. Bạn chắc chắn chưa?"
        handleAccept={() => handleDeleteMessageCustom()}
      />

      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
          height: "100%",
        }}
        alignItems="flex-start"
      >
        {matchesSM ? (
          <MDrawer
            anchor="left"
            open={isSidebarLeft}
            onClose={handleToggleSidebarLeft}
          >
            <Paper
              sx={{
                maxWidth: theme.sizes.sidebar - 100,
                pb: 3,
                // minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
              }}
            >
              <Stack
                sx={{
                  p: (theme) => theme.spacing(1, 1, 2),
                  gap: 1,
                }}
              >
                <SidebarHeader
                  title="Tin nhắn"
                  handleToggleSidebar={handleToggleSidebarLeft}
                >
                  <IconButton
                    sx={{
                      bgcolor: "background.opacity",
                      "& svg": { fontSize: 18 },
                    }}
                    onClick={() => handleActions("create-room")}
                  >
                    {icons.AddIcon}
                  </IconButton>
                </SidebarHeader>

                <Box>
                  <TextField
                    sx={{
                      width: "100%",
                      "& input": { py: 1, fontSize: 14 },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: (theme) => theme.sizes.radius,
                      },
                    }}
                    placeholder="Tìm kiếm tin nhắn"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={{ "& svg": { fontSize: 20 } }}>
                            {icons.SearchIcon}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>

              <Divider />

              {paginateRoom?.data?.map((item) => (
                <RoomItem
                  key={item._id}
                  item={item}
                  handleGetRoomById={(roomID) =>
                    handleGetRoomByIdCustom(roomID, true)
                  }
                  active={(room && room?._id === item?._id) || false}
                />
              ))}
            </Paper>
          </MDrawer>
        ) : (
          <StickySidebar
            sx={{
              transition: "all 0.6s ease",
              transform: isSidebarLeft
                ? `translate3d(0px, 0px, 0px)`
                : `translate3d(-100%, 0px, 0px)`,
              bgcolor: "background.navbar",
              "& .content-scroll": {
                maxHeight: (theme) => ({
                  xs: `calc(100vh - ${
                    theme.sizes.sidebarBottom + theme.sizes.header
                  }px)!important`,
                  sm2: `calc(100vh - ${theme.sizes.header}px)!important`,
                }),
              },
            }}
          >
            <Box
              sx={{
                pb: 3,
                minHeight: (theme) => ({
                  xs: `calc(100vh - ${
                    theme.sizes.header + theme.sizes.sidebarBottom
                  }px)`,
                  sm2: `calc(100vh - ${theme.sizes.header}px)`,
                }),
              }}
            >
              <Stack sx={{ p: (theme) => theme.spacing(1, 1, 2), gap: 1 }}>
                <SidebarHeader
                  title="Tin nhắn"
                  handleToggleSidebar={handleToggleSidebarLeft}
                >
                  <IconButton
                    sx={{
                      bgcolor: "background.opacity",
                      "& svg": { fontSize: 18 },
                    }}
                    onClick={() => handleActions("create-room")}
                  >
                    {icons.AddIcon}
                  </IconButton>
                </SidebarHeader>

                <Box>
                  <TextField
                    sx={{
                      width: "100%",
                      "& input": { py: 1, fontSize: 14 },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: (theme) => theme.sizes.radius,
                      },
                    }}
                    placeholder="Tìm kiếm tin nhắn"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={{ "& svg": { fontSize: 20 } }}>
                            {icons.SearchIcon}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Stack>

              <Divider />

              {paginateRoom?.data?.map((item) => (
                <RoomItem
                  key={item._id}
                  item={item}
                  handleGetRoomById={handleGetRoomByIdCustom}
                  active={(room && room?._id === item?._id) || false}
                />
              ))}
            </Box>
          </StickySidebar>
        )}

        {room ? (
          <Box
            sx={[
              (theme) => ({
                flex: 1,
                display: "flex",
                height: "100%",
                maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
                overflow: "hidden",
                transition: "all 0.5s ease 0s",
                transform: {
                  xs: `translateX(0px)`,
                  sm: isSidebarLeft ? `translateX(0px)` : `translateX(-250px)`,
                },
                minWidth: !isSidebarLeft ? `100%` : 350,
              }),
            ]}
          >
            <Stack
              sx={{
                flex: 1,
                minWidth: isSidebarContent ? "0%" : "100%",
                transition: "min-width 0.5s ease 0s",
              }}
            >
              <HeaderChat
                room={room}
                isSidebarLeft={isSidebarLeft}
                handleToggleSidebarLeft={handleToggleSidebarLeft}
                handleToggleSidebar={handleToggleSidebarContent}
                handleGetParticipants={handleToggleShowPariticipants}
                handleToggleAddMember={handleToggleAddMember}
              />

              <BoxChat
                onScroll={onGetMoreMessages}
                user={user}
                handleActions={handleActions}
                paginateMessage={paginateMessage}
                ref={boxChatRef}
              >
                {isLoading?.message ? (
                  <Box>
                    <LoadingEllipsisElement />
                  </Box>
                ) : (
                  ""
                )}
              </BoxChat>

              <InputCreateMessage onSubmit={handleAddMessageCustom} />
            </Stack>

            {matchesMD ? (
              <MDrawer
                anchor="right"
                open={isSidebarContent}
                onClose={handleToggleSidebarContent}
              >
                <Stack
                  sx={{
                    width: (theme) => theme.sizes.sidebar - 100,
                    height: "100%",
                  }}
                >
                  <InfomationChat
                    room={room}
                    handleActions={handleActions}
                    handleEditRoom={(form, roomID) =>
                      handleEditRoomCustom(
                        {
                          ...form,
                          lastMessage: `${user.firstName} ${user.lastName} vừa đổi tên phòng là ${form.title}`,
                        },
                        roomID
                      )
                    }
                  />
                </Stack>
              </MDrawer>
            ) : (
              <Stack
                sx={{
                  width: (theme) => theme.sizes.sidebar,
                  transform: isSidebarContent
                    ? `translate3d(0px, 0px, 0px)`
                    : `translate3d(100%, 0px, 0px)`,
                  visibility: "visible",
                  transition: "all 0.6s ease 0s",
                }}
              >
                <InfomationChat
                  room={room}
                  handleActions={handleActions}
                  handleEditRoom={(form, roomID) =>
                    handleEditRoomCustom(
                      {
                        ...form,
                        lastMessage: `${user.firstName} ${user.lastName} vừa đổi tên phòng là ${form.title}`,
                      },
                      roomID
                    )
                  }
                />
              </Stack>
            )}
          </Box>
        ) : (
          <Stack
            sx={{
              transition: "all 0.5s ease 0s",
              transform: {
                xs: `translateX(0px)`,
                sm: isSidebarLeft ? `translateX(0px)` : `translateX(-250px)`,
              },
              minWidth: !isSidebarLeft ? `100%` : `inherit`,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              height: (theme) => ({
                xs: `calc(100vh - ${
                  theme.sizes.header + theme.sizes.sidebarBottom
                }px)`,
                sm2: `calc(100vh - ${theme.sizes.header}px)`,
              }),
            }}
          >
            <Typography onClick={handleToggleSidebarLeft}>
              Chọn một ai đó để trò chuyện
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Chat;
