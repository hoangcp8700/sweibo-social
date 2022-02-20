import React from "react";

import {
  Box,
  Stack,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { fakeData } from "constants";
import {
  StickySidebar,
  SidebarHeader,
  ChatItem,
  RoomItem,
  BoxChat,
  InfomationChat,
  ToggleSidebar,
} from "components";
import { icons } from "constants";
import { useChat } from "hooks";

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  length: 0,
};

const Chat = () => {
  const { handleGetRooms, handleGetRoomById } = useChat();
  const [isSidebarContent, setIsSidebarContent] = React.useState(false);
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

  const [paginateRoom, setPaginateRoom] = React.useState(initialize); // rooms
  const [paginateMessage, setPaginateMessage] = React.useState(initialize); // messages
  const [room, setRoom] = React.useState(null);

  const handleGetRoomsCustom = async () => {
    if (!paginateRoom.isNextPage) return;
    const response = await handleGetRooms(paginateRoom.page);

    setPaginateRoom({
      page: response.next,
      isNextPage: response.hasNextPage ? true : false,
      data: [...paginateRoom.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  React.useEffect(() => {
    handleGetRoomsCustom();
  }, []);

  const handleToggleSidebarContent = React.useCallback(
    () => setIsSidebarContent(!isSidebarContent),
    [isSidebarContent]
  );

  const handleToggleSidebarLeft = () => setIsSidebarLeft(!isSidebarLeft);

  const handleGetRoomByIdCustom = async (roomID) => {
    const response = await handleGetRoomById(roomID);
    setRoom(response);
  };

  console.log("room", room);
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
              />
            ))}
          </Paper>
        </StickySidebar>

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
            <BoxChat
              room={room}
              handleToggleSidebar={handleToggleSidebarContent}
            />
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
            <InfomationChat />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Chat;
