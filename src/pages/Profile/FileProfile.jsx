import React from "react";
import { Box, Stack, Paper, Avatar, Typography } from "@mui/material";

const list = [
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
  `https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/p320x320/35189819_1100456500105531_777321460610891776_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=qCwA53P0aDgAX-nG3qa&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_Es2JmgGwnZHfvqf5xJyRSKLM3b4jKNl1ZAWC14VPezQ&oe=620CEFC6`,
];

const ImageBox = ({ src }) => {
  return (
    <Box>
      <Avatar
        src={src}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: (theme) => theme.sizes.minBase,
        }}
      />
    </Box>
  );
};

const FileProfile = () => {
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
          <Typography variant="h6">Ảnh</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr) )",
          gap: 2,
          px: 2,
        }}
      >
        {list.map((item) => (
          <ImageBox key={item.id} src={item} />
        ))}
      </Box>
    </Paper>
  );
};

export default FileProfile;
