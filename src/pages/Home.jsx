import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { fakeData } from "constants";
import {
  History,
  CreatePost,
  PostItem,
  AdvertiseItem,
  BirthdayToday,
  ActivityStatus,
  SidebarHome,
  FriendSuggestion,
} from "components";

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const [advertises, setAdvertises] = React.useState([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };

    const getAdvertises = () => {
      const resposne = fakeData.GET_ADVERTISE();
      setAdvertises(resposne);
    };
    getAdvertises();
    getUsers();
  }, []);

  return (
    <Box>
      <Stack direction="row" sx={{ gap: 3 }}>
        <Box
          sx={[
            { flex: 0.8, maxWidth: 360 },
            (theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
        >
          <SidebarHome />
          <Divider sx={{ my: 1 }} />
          <FriendSuggestion lists={users} />
        </Box>

        <Box
          sx={{
            flex: 2,
          }}
        >
          <Box
            sx={[
              { maxWidth: 600, m: "auto", transition: "max-width 150ms" },
              (theme) => ({ [theme.breakpoints.up("xl")]: { maxWidth: 900 } }),
              (theme) => ({
                [theme.breakpoints.down("700")]: { maxWidth: 500 },
              }),
              (theme) => ({
                [theme.breakpoints.down("sm")]: { maxWidth: 400 },
              }),
              (theme) => ({
                [theme.breakpoints.down("480")]: { maxWidth: 320 },
              }),
              (theme) => ({
                [theme.breakpoints.down("375")]: { maxWidth: 285 },
              }),
              (theme) => ({
                [theme.breakpoints.down("330")]: { maxWidth: 250 },
              }),
            ]}
          >
            <Stack spacing={3}>
              <History users={users} />
              <CreatePost />
              <Stack spacing={3}>
                <PostItem />
                <PostItem />
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={[
            {
              flex: 0.8,
              maxWidth: 360,
              // maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
              // overflow: "hidden",
            },
            (theme) => ({
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }),
          ]}
        >
          <Stack spacing={1}>
            <BirthdayToday />
            <Divider sx={{ pt: 1 }} />
            {/* advertise */}

            <Box>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Được tài trợ
              </Typography>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {advertises?.map((item) => (
                  <AdvertiseItem key={item.id} item={item} />
                ))}
              </Stack>
            </Box>
            <Divider />

            <ActivityStatus lists={users} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
