import React from "react";
import { Stack, Box, Typography } from "@mui/material";

const AdvertiseItem = ({ item }) => {
  return (
    <Stack
      direction={item?.reverse ? "row-reverse" : "row"}
      alignItems="center"
      spacing={2}
      sx={{
        p: 1,
        borderRadius: (theme) => theme.sizes.minBase,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "background.opacity",
        },
      }}
    >
      <Box
        sx={{
          width: 120,
          minWidth: 120,
          height: 120,
          borderRadius: (theme) => theme.sizes.minBase,
          overflow: "hidden",
          boxShadow: (theme) => theme.shadows[10],
        }}
      >
        <img
          src={item?.thumbnail}
          alt="thumnail"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2">{item?.title} </Typography>
        <Typography
          variant="body2"
          component={"a"}
          href={item?.path}
          sx={{ color: "text.secondary" }}
          target="_blank"
        >
          {item?.path}{" "}
        </Typography>
      </Box>
    </Stack>
  );
};

export default AdvertiseItem;
