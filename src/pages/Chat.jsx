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
} from "components";
import { icons } from "constants";
import { useChat, useAuth } from "hooks";

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
    handleGetMessagesOfRoom,
    handleAddMessage,
  } = useChat();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const [isSidebarContent, setIsSidebarContent] = React.useState(false);
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

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
  }, []);

  // get messages of room
  React.useEffect(() => {
    if (!room) return;
    const getMessages = async () => {
      await handleGetMessageCustom(room?._id);
      boxChatRef.current.scrollTo({
        behavior: "smooth",
        top: boxChatRef.current.scrollHeight,
      });
      socket.current.emit("joinRoom", { user, roomID: room?._id });
    };
    getMessages();
  }, [room]);

  // event socket
  React.useEffect(() => {
    if (!socket || !user) return;
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (data) => console.log("getUsers", data));
    socket.current.on("getUpdateRoom", ({ room }) => {
      console.log("getUpdateRoom", room);

      setPaginateRoom((prev) => {
        const newRoom = prev.data.map((item) => {
          if (item?._id !== room?._id) return item;
          return {
            ...item,
            title: room.title,
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
          title: room.title,
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

      boxChatRef.current.scrollTo({
        top: boxChatRef.current.scrollHeight,
      });
    });
  }, [user]);

  console.log("setPaginateRoom", paginateRoom);

  const handleToggleSidebarContent = React.useCallback(
    () => setIsSidebarContent(!isSidebarContent),
    [isSidebarContent]
  );

  const handleToggleSidebarLeft = () => setIsSidebarLeft(!isSidebarLeft);

  // -------------------room---------------
  const handleGetRoomByIdCustom = async (roomID) => {
    const response = await handleGetRoomDetail(roomID);
    if (response) {
      setPaginateMessage(initialize); // reset
      setRoom(response);
    }
  };

  const handleEditRoomCustom = async (form, roomID) => {
    const response = await handleUpdateRoom(form, roomID);
    if (response) {
      socket.current.emit("updateRoom", {
        room: response.data,
      });

      enqueueSnackbar(response.message, { variant: "success" });
    }
  };

  /// -----------------add message--------------
  const handleAddMessageCustom = async (form) => {
    const response = await handleAddMessage(form, room?._id);
    if (response?.success) {
      socket.current.emit("sendMessage", {
        roomID: room?._id,
        message: response.data,
      });
      socket.current.emit("updateRoom", {
        room: response.room,
      });
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
    <Box>
      <ToggleSidebar
        isShowSidebar={isSidebarLeft}
        handleToggleSidebar={handleToggleSidebarLeft}
      />
      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
        }}
        alignItems="flex-start"
      >
        <StickySidebar
          sx={{
            transition: "all 0.6s ease",
            transform: isSidebarLeft
              ? `translate3d(0px, 0px, 0px)`
              : `translate3d(-100%, 0px, 0px)`,
          }}
          isShowSidebar={isSidebarLeft}
          containerStyle={[
            (theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
        >
          <Paper
            sx={{
              bgcolor: "background.navbar",
              pb: 3,
              minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
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
          </Paper>
        </StickySidebar>

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
                transform: !isSidebarLeft
                  ? `translateX(-250px)`
                  : `translateX(0)`,
                minWidth: !isSidebarLeft ? `100%` : `inherit`,
                [theme.breakpoints.down("md")]: {
                  transform: `translateX(0)`,
                },
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
                handleToggleSidebar={handleToggleSidebarContent}
              />

              <BoxChat
                onScroll={onGetMoreMessages}
                user={user}
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
                handleEditRoom={handleEditRoomCustom}
              />
            </Stack>
          </Box>
        ) : (
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              height: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
            }}
          >
            <Typography>Chọn một ai đó để trò chuyện</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Chat;
