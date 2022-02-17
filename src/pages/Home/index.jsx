import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack, Typography, Divider, IconButton } from "@mui/material";
import { fakeData } from "constants";
import {
  History,
  InputCreatePost,
  PostItem,
  AdvertiseItem,
  BirthdayToday,
  ActivityStatus,
  SidebarHome,
  FriendSuggestion,
  StickySidebar,
} from "components";
import { icons } from "constants";
import { usePost } from "hooks";

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "relative", scrollBehavior: "smooth" }}>
      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 3 },
        }}
        alignItems="flex-start"
      >
        <StickySidebar
          containerStyle={[
            (theme) => ({
              minWidth: {
                xs: theme.sizes.sidebar - 100,
                lg: theme.sizes.sidebar,
              },
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ px: 1, pb: 2 }}
        >
          <SidebarHome />
          <Divider sx={{ my: 1 }} />
          <FriendSuggestion lists={users} />
        </StickySidebar>

        <Box
          sx={{
            flex: 1,
            p: 3,
          }}
        >
          <Box
            sx={[
              { maxWidth: 600, m: "0 auto" },
              (theme) => ({ [theme.breakpoints.up("xl")]: { maxWidth: 900 } }),
              (theme) => ({
                [theme.breakpoints.down("md")]: { maxWidth: 800 },
              }),
            ]}
          >
            <Stack spacing={3}>
              <History
                isHistory={true}
                handleClick={(item) => console.log("seen history", item)}
                users={users}
                maxWidth="calc(100vw - 65px)"
              />
              <Box>
                <Outlet />
              </Box>
            </Stack>
          </Box>
        </Box>

        <StickySidebar
          containerStyle={[
            (theme) => ({
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ py: 2, pr: 2, mr: 1, gap: 1 }}
        >
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

          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Hoạt động
              </Typography>
              <IconButton>{icons.MoreHorizIcon}</IconButton>
            </Stack>
            <Stack spacing={1}>
              {users?.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    transition: "background 150ms",
                    p: 1,
                    borderRadius: (theme) => theme.sizes.minBase / 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "background.opacity",
                    },
                  }}
                >
                  <ActivityStatus label={item.name} src={item.avatar} />
                  <Typography variant="subtitle2" sx={{}}>
                    {item?.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </StickySidebar>
      </Stack>

      <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            bgcolor: "primary.main",
            "& svg": { fill: (theme) => theme.palette.common.white },
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          {icons.KeyboardArrowUpIcon}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Home;
