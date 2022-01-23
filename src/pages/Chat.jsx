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
  BoxChat,
  InfomationChat,
  ToggleSidebar,
} from "components";
import { icons } from "constants";

const Chat = () => {
  const [users, setUsers] = React.useState([]);
  const [isSidebarContent, setIsSidebarContent] = React.useState(false);
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };
    getUsers();
  }, []);

  const handleToggleSidebarContent = React.useCallback(
    () => setIsSidebarContent(!isSidebarContent),
    [isSidebarContent]
  );

  const handleToggleSidebarLeft = () => setIsSidebarLeft(!isSidebarLeft);

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

            {users?.map((item) => (
              <ChatItem key={item.id} item={item} />
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
            <BoxChat handleToggleSidebar={handleToggleSidebarContent} />
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
