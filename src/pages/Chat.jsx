import React from "react";

import {
  Box,
  Stack,
  Typography,
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
} from "components";
import { icons } from "constants";

const Chat = () => {
  const [users, setUsers] = React.useState([]);
  const [isSidebar, setIsSidebar] = React.useState(false);

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };
    getUsers();
  }, []);

  const handleToggleSidebar = () => setIsSidebar(!isSidebar);
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
        }}
        alignItems="flex-start"
      >
        <StickySidebar
          containerStyle={[
            (theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ pb: 3 }}
        >
          <Paper sx={{ bgcolor: "background.navbar" }}>
            <Stack sx={{ px: 1, gap: 1, pt: 1 }}>
              <SidebarHeader title="Tin nhắn">
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
          sx={{
            flex: 1,
            display: "flex",
            height: "100%",
            maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              flex: 1,
              minWidth: isSidebar ? "0%" : "100%",
              transition: "min-width 0.5s ease 0s",
            }}
          >
            <BoxChat handleToggleSidebar={handleToggleSidebar} />
          </Stack>
          <Stack
            sx={{
              width: (theme) => theme.sizes.sidebar,
              transform: isSidebar
                ? `translate3d(0px, 0px, 0px)`
                : `translate3d(100%, 0px, 0px)`,
              visibility: "visible",
              transition: " all 0.6s ease 0s",
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
