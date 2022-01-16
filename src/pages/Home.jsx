import React from "react";
import { Box, Stack } from "@mui/material";
import { fakeData } from "constants";
import { History, CreatePost, PostItem } from "components";

const Home = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };
    getUsers();
  }, []);

  return (
    <Stack direction="row">
      <Box sx={{ flex: 1 }}>aa</Box>
      <Stack sx={{ flex: 2, maxWidth: 700 }} spacing={3}>
        <History users={users} />
        <CreatePost />
        <Stack spacing={3}>
          <PostItem />
          <PostItem />
        </Stack>
      </Stack>
      <Box sx={{ flex: 1 }}>aa</Box>
    </Stack>
  );
};

export default Home;
