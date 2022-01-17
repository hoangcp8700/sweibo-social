import React from "react";
import { Stack, Box, Typography } from "@mui/material";

const NotFoundFriend = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "49vh" }}
    >
      <Box sx={{ width: 200, height: 200 }}>
        <img
          src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
          alt="thumbnail"
        />
      </Box>
      <Typography variant="subtitle2">
        Chọn tên của người mà bạn muốn xem trước trang cá nhân.
      </Typography>
    </Stack>
  );
};

export default NotFoundFriend;
