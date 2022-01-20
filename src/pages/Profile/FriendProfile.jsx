import React from "react";
import {
  InfomationUser,
  AlbumFriends,
  AlbumImage,
  CreatePost,
  PostItem,
  FriendItem,
} from "components";
import {
  Box,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { icons } from "constants";

const list = [
  {
    id: "123",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "121233",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "112323",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "112323",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "121233",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "121233",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
];

const FriendProfile = () => {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minbase,
      }}
    >
      <Box sx={{ position: "relative", mb: 2 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Bạn bè</Typography>
          <TextField
            sx={{
              "& input": { py: 1, fontSize: 14 },
              "& .MuiOutlinedInput-root": {
                borderRadius: (theme) => theme.sizes.radius,
              },
            }}
            placeholder="Tìm kiếm"
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
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr) )",
          gap: 2,
          px: 2,
        }}
      >
        {list.map((item) => (
          <FriendItem key={item.id} item={item} />
        ))}
      </Box>
    </Paper>
  );
};

export default FriendProfile;
