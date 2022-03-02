import React from "react";
import { Avatar, AvatarGroup, Box } from "@mui/material";

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
                "&:nth-of-type(3) ": {
                  ml: -1,
                  mt: { xs: sizeGroup <= 25 ? -2 : -4, sm: -2 },
                },
                "&:nth-child(4) ": {
                  ml: `-8px!important`,
                  mt: { xs: sizeGroup <= 25 ? -2 : -4, sm: -2 },
                },
                "& img": { borderRadius: "50%" },
              },
            },

        styleContainer,
      ]}
    >
      {images?.length ? (
        images.map((item) => (
          <Avatar
            key={item._id}
            src={
              item?.userID?.avatar?.url ||
              `${process.env.PUBLIC_URL}/weibo64.png`
            }
          >
            {item?.userID?.firstName.charAt(0)}{" "}
            {item?.userID?.lastName.charAt(0)}
          </Avatar>
        ))
      ) : (
        <Box sx={{ bgcolor: "common.white", borderRadius: "50%" }}>
          <Avatar src={`${process.env.PUBLIC_URL}/weibo64.png`} />
        </Box>
      )}
    </AvatarGroup>
  );
};

export default AvatarGroupComponent;
