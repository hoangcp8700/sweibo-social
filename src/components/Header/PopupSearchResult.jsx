import React from "react";
import { MMenu } from "components/MUI";
import { Link } from "react-router-dom";
import { MenuItem, Box, Avatar, Typography } from "@mui/material";
import { icons } from "constants";
import { PATH_PAGE } from "constants/paths";

const PopupSearchResult = (props) => {
  const { name, lists, handleClose, ...restProps } = props;
  return (
    <MMenu {...props} handleClose={handleClose}>
      {lists?.length ? (
        lists.map((item) => (
          <Typography
            key={item?._id}
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=${item?.email}`}
            onClick={() => handleClose(name)}
          >
            <MenuItem sx={{ gap: 2 }}>
              <Avatar src={item?.avatar?.url} />
              <Box>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {item?.firstName} {item?.lastName}{" "}
                  {item?.nickName ? `(${item?.nickName})` : ""}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Xem trang thông tin cá nhân
                </Typography>
              </Box>
            </MenuItem>
          </Typography>
        ))
      ) : (
        <Typography align="center" variant="subtitle2">
          Không có kết quả
        </Typography>
      )}
    </MMenu>
  );
};

export default PopupSearchResult;
