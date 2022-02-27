import React from "react";
import { Avatar, AvatarGroup, Typography } from "@mui/material";

const AvatarGroupComponent = ({
  images,
  imageOnce = 40,
  sizeGroup = 25,
  sizeContainer = 60,
  styleContainer,
}) => {
  return (
    <AvatarGroup
      max={4}
      sx={[
        {
          width: sizeContainer,
          minWidth: sizeContainer,
          height: sizeContainer,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          letterSpacing: -2.5,
        },

        images?.length <= 1
          ? {
              "& .MuiAvatar-root": {
                width: imageOnce,
                height: imageOnce,
                fontSize: 12,
                letterSpacing: -1.5,
              },
            }
          : {
              pl: 1,
              "& .MuiAvatar-root": {
                fontSize: 12,
                fontWeight: "bold",
                bgcolor: "text.secondary",
                width: {
                  xs: sizeGroup <= 25 ? sizeGroup : sizeGroup - 5,
                  sm: sizeGroup,
                },
                height: {
                  xs: sizeGroup <= 25 ? sizeGroup : sizeGroup - 5,
                  sm: sizeGroup,
                },
                "&::nth-of-type(3) ": {
                  ml: -1,
                  mt: { xs: sizeGroup <= 25 ? -2 : -6, sm: -2 },
                },
                "&::nth-of-type(4) ": {
                  ml: -1,
                  mt: { xs: sizeGroup <= 25 ? -2 : -6, sm: -2 },
                },
                "& img": { borderRadius: "50%" },
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
