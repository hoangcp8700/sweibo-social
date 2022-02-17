import React from "react";
import queryString from "query-string";

import { FriendItem } from "components";
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
import { useLocation } from "react-router-dom";
import { useUser } from "hooks";
import { MButton } from "components/MUI";
import { data } from "constants";

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
  {
    id: "121242342333",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "1212323433",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "12123123123",
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
    id: "121242342333",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "1212323433",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
  {
    id: "12123123123",
    name: "Tấn tài",
    avatar: `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
    mutualFriends: 102,
  },
];

const initialize = {
  page: 1,
  isNextPage: true,
  data: [],
  length: 0,
};

const FriendProfile = () => {
  const location = useLocation();
  const [paginate, setPaginate] = React.useState(initialize); // friends
  const { handleGetFriends } = useUser();

  const parsed = queryString.parse(location?.search);
  const isAuth = !parsed.email ? true : false;

  const [tag, setTag] = React.useState("active");

  const handleGetFriendsCustom = async () => {
    if (!paginate.isNextPage) return;
    const response = await handleGetFriends(paginate.page, tag);
    setPaginate({
      page: response.next,
      isNextPage: response.hasNextPage ? true : false,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  React.useEffect(() => {
    handleGetFriendsCustom();
  }, [tag]);

  const handleChangeTag = (value) => {
    setPaginate(initialize);
    setTag(value);
  };

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
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            px: 2,
            alignItems: { xs: "flex-start", sm: "center" },
          }}
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
      <Box sx={{ px: 2, mb: 3 }}>
        <Stack direction="row" spacing={1}>
          {data?.menuFriends?.map((item, index) => {
            const match = item.value === tag;
            return (
              <MButton
                key={item.label}
                sx={{
                  px: 3,
                  position: "relative",
                  "&:hover": {
                    bgcolor: "background.opacity",
                  },
                }}
                onClick={() => handleChangeTag(item.value)}
              >
                <Typography
                  variant="body2"
                  sx={{ color: match ? "primary.main" : "text.primary" }}
                >
                  {item.label}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderBottom: (theme) =>
                      `3px solid ${theme.palette.primary.main}`,
                    bgcolor: "primary.main",
                    width: match ? "100%" : "0%",
                    height: 3,
                    transition: "width .3s",
                  }}
                />
              </MButton>
            );
          })}
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(200px, 1fr) )",
            sm: "repeat(auto-fill, minmax(250px, 1fr) )",
            md: "repeat(auto-fill, minmax(400px, 1fr) )",
          },
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
