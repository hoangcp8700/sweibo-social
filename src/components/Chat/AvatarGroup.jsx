import React from "react";
import { Avatar, AvatarGroup, Typography } from "@mui/material";

const AvatarGroupComponent = ({
  images,
  sizeGroup = 25,
  sizeContainer = 60,
  styleContainer,
}) => {
  return (
    <AvatarGroup
      max={4}
      sx={[
        images?.length > 1
          ? {
              "& .MuiAvatar-root": {
                width: sizeGroup,
                height: sizeGroup,
                fontSize: 12,
                letterSpacing: -1.5,
              },
            }
          : "",
        {
          width: sizeContainer,
          height: sizeContainer,
          flexWrap: "wrap",
          justifyContent: "center",
          letterSpacing: -2.5,
          "& .MuiAvatar-root": {
            "&:last-child": {
              marginLeft: -1,
            },
          },
        },
        styleContainer,
      ]}
    >
      {images?.length
        ? images.map((item) => (
            <Avatar key={item._id} src={item?.userID?.avatar?.url}>
              {item?.userID?.firstName.charAt(0)}{" "}
              {item?.userID?.lastName.charAt(0)}
            </Avatar>
          ))
        : ""}
    </AvatarGroup>
  );
};

export default AvatarGroupComponent;
