import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { lineClampStyle } from "utils/lineClampStyle";

const ImageItem = ({ src, label }) => {
  return (
    <Box sx={{ flex: 1, minWidth: 120 }}>
      <Box
        sx={{
          position: "relative",
          height: 120,
          width: "100%",
          borderRadius: (theme) => theme.sizes.minBase,
          overflow: "hidden",
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "background-color 150ms",
            "&:hover": {
              bgcolor: "background.opacity2",
            },
          }}
        />
        <img src={src} alt="image" style={{ objectFit: "cover" }} />
      </Box>
      <Typography variant="subtitle2">{label}</Typography>
    </Box>
  );
};

const listFriend = [
  {
    id: "123243",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "12123123",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "12343",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "14565423",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "1256543",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "13453423",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "122343",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "112323",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
  {
    id: "12323",
    avatar: ` https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2`,
    name: "Phước tấn",
  },
];

const AlbumFriends = () => {
  return (
    <Paper
      sx={{
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minBase,
        p: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack>
          <Typography variant="h6">Bạn bè</Typography>
          <Typography sx={{ color: "text.secondary", mt: -0.5 }}>
            130 bạn chung
          </Typography>
        </Stack>
        <Typography
          color="primary"
          component={Link}
          to="/"
          sx={{
            ...lineClampStyle(1),
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Xem tất cả
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 1,
          borderRadius: (theme) => theme.sizes.minBase,
          overflow: "hidden",
          maxHeight: { xs: 300, md: "inherit" },
        }}
      >
        {listFriend.map((item, index) => (
          <ImageItem src={item.avatar} label={item.name} key={item.id} />
        ))}
      </Stack>
    </Paper>
  );
};

export default AlbumFriends;
