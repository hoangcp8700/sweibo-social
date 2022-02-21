import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingEllipsisElement } from "components";

import { Box, Stack, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box>
      <LoadingEllipsisElement />
    </Box>
  );
};

const EndMessage = ({ message }) => {
  return (
    <Stack alignItems="center" sx={{ my: 5 }}>
      <Typography>{message}</Typography>
    </Stack>
  );
};
const InfiniteScrollComponent = (props) => {
  const { children, data, hasNextPage, fetch, endMessage = "" } = props;

  return (
    <InfiniteScroll
      dataLength={data.length} //This is important field to render the next data
      next={fetch}
      hasMore={hasNextPage}
      loader={<Loading />}
      endMessage={endMessage ? <EndMessage message={endMessage} /> : ""}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
