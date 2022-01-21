import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { lineClampStyle } from "utils/lineClampStyle";

const ImageItem = ({ src }) => {
  return (
    <Box
      sx={{
        height: 120,
        flex: 1,
        minWidth: 120,
        position: "relative",
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
  );
};

const listImage = [
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
  "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/45491645_987949061405597_8608908855570595840_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=UUFoILhbVJEAX9yLX0E&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_7yuzVZUgxGH0xDZtsAQOJ4c_AoXeIMJB5Qy6_GcqBPw&oe=621095D2",
];
const AlbumImage = () => {
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
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">Ảnh</Typography>
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
          maxHeight: { xs: 250, md: "inherit" },
        }}
      >
        {listImage.map((item, index) => (
          <ImageItem src={item} key={index} />
        ))}
      </Stack>
    </Paper>
  );
};

export default AlbumImage;
