import React from "react";
import "./style.css";
import { Box, Typography } from "@mui/material";
import Masonry from "react-responsive-masonry";

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
      }}
    >
      <Typography variant="h3" sx={{ cursor: "context-menu" }}>
        +{countMore}
      </Typography>
    </Box>
  );
};
const MasonryComponent = ({ lists, columnsCount = 2 }) => {
  const countMore = lists?.length >= 5 ? lists?.length - 5 : "";

  return lists?.length ? (
    <Masonry gutter="10px" columnsCount={columnsCount}>
      {lists.slice(0, 5).map((item, key) => (
        <Box
          key={key}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          {lists.length > 5 && key + 1 === 4 && countMore > 0 ? (
            <BoxMore countMore={countMore} />
          ) : (
            ""
          )}
          <img
            src={item.url}
            style={{ width: "100%", height: "100%" }}
            alt={item?.name || `mansory-${key}`}
          />
        </Box>
      ))}
    </Masonry>
  ) : (
    ""
  );
};

export default MasonryComponent;
