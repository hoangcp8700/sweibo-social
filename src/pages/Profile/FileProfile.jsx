import React from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "hooks";
import queryString from "query-string";

import { Box, Stack, Paper, Avatar, Typography } from "@mui/material";
import { MButton } from "components/MUI";

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

const types = [
  { label: "Tất cả ảnh", value: "" },
  { label: "Album", value: "album" },
];

const ImageBox = ({ source }) => {
  return (
    <Box>
      <Avatar
        src={source.url}
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
  const location = useLocation();
  const { handleGetAlbums } = useUser();

  const [typeAlbum, setTypeAlbum] = React.useState("");
  const [listImages, setListImages] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const getAlbums = async () => {
      try {
        const parsed = queryString.parse(location?.search);
        const response = await handleGetAlbums(page, parsed?.email);
        setListImages(response);
        console.log(" FileProfile location", response);
      } catch (error) {
        console.log("err", error);
      }
    };
    getAlbums();
  }, [location]);

  const handleChangeType = (value) => setTypeAlbum(value);

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minbase,
      }}
    >
      <Box sx={{ position: "relative", mb: 2, ml: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Ảnh</Typography>
          <Stack direction="row" spacing={1}>
            {types.map((item, index) => {
              const match = typeAlbum === item.value;
              return (
                <MButton
                  key={item.label}
                  sx={{
                    py: 1,
                    px: 4,
                    position: "relative",
                    color: match ? "primary.main" : "text.primary",

                    "&:hover": {
                      bgcolor: "background.opacity",
                    },
                  }}
                  onClick={() => handleChangeType(item.value)}
                >
                  {item.label}
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
        {listImages?.length
          ? listImages.map((item) => (
              <ImageBox key={item._id} source={item.image} />
            ))
          : ""}
      </Box>
    </Paper>
  );
};

export default FileProfile;
