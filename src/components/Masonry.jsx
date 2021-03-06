import React from "react";
import { Box, Paper, IconButton, Typography } from "@mui/material";
import Masonry from "react-responsive-masonry";
import LazyLoad from "react-lazyload";
import { icons } from "constants";

const BoxMore = ({ countMore }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Typography variant="h3" sx={{ cursor: "context-menu" }}>
        +{countMore}
      </Typography>
    </Box>
  );
};

const MasonryComponent = ({
  lists,
  handleToggleOpenLightBox,
  handleDeleteFile,
  columnsCount = 2,
  isDisabledDelete = true,
}) => {
  const countMore = lists?.length >= 5 ? lists?.length - 5 : "";

  return lists?.length ? (
    <Masonry gutter="10px" columnsCount={lists?.length <= 1 ? 1 : columnsCount}>
      {lists.slice(0, 5).map((item, key) => (
        <Box
          key={key}
          sx={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Box
            sx={{ width: "100%", height: "100%" }}
            onClick={() => handleToggleOpenLightBox(true)}
          >
            {lists.length > 5 && key + 1 === 4 && countMore > 0 ? (
              <BoxMore countMore={countMore} />
            ) : (
              ""
            )}
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {/* <LazyLoad height={200}> */}
              <img
                src={item.url || item?.secure_url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  cursor: "pointer",
                }}
                loading="lazy"
                alt={item?.name || `mansory-${key}`}
              />

              {/* </LazyLoad> */}
            </Box>
          </Box>
          {!isDisabledDelete ? (
            <Paper
              elevation={5}
              sx={{
                position: "absolute",
                top: 15,
                right: 15,
                bgcolor: "background.main",
                borderRadius: "50%",
                zIndex: 10,
              }}
            >
              <IconButton
                onClick={() => handleDeleteFile(item?.public_id)}
                sx={{
                  "& svg": {
                    fill: (theme) => theme.palette.text.primary,
                    fontSize: 14,
                  },
                }}
              >
                {icons.CloseIcon}
              </IconButton>
            </Paper>
          ) : (
            ""
          )}
        </Box>
      ))}
    </Masonry>
  ) : (
    ""
  );
};

export default MasonryComponent;
