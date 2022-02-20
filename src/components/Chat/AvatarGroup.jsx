import React from "react";
import { Avatar, AvatarGroup, Typography } from "@mui/material";

const AvatarGroupComponent = ({ images }) => {
  return (
    <AvatarGroup
      max={4}
      sx={[
        images.length > 1
          ? {
              "& .MuiAvatar-root": {
                width: 25,
                height: 25,
                fontSize: 12,
                letterSpacing: -1.5,
              },
            }
          : "",
        {
          width: 60,
          flexWrap: "wrap",
          justifyContent: "center",
          letterSpacing: -2.5,
          "& .MuiAvatar-root": {
            "&:last-child": {
              marginLeft: -1,
            },
          },
        },
      ]}
    >
      {images.map((item) => (
        <Avatar key={item._id} src={item?.userID?.avatar?.url}>
          {item?.userID?.firstName.charAt(0)} {item?.userID?.lastName.charAt(0)}
        </Avatar>
      ))}
    </AvatarGroup>
  );
};

export default AvatarGroupComponent;
