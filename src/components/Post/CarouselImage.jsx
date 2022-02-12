import React from "react";
import StickyBox from "react-sticky-box";

import { Box, Stack, styled, useTheme } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& .content-scroll": {
    height: "100%",
    overflowY: "scroll",
    maxHeight: `100vh`,
  },
}));

const CarouselImage = (props) => {
  const { containerStyle, contentStyle, children, sx } = props;

  return (
    <StickyBox>
      <Box sx={{ position: "relative", zIndex: 2, ...sx }}>
        <Container sx={containerStyle}>
          <Stack spacing={1} className="content-scroll" sx={contentStyle}>
            {children}
          </Stack>
        </Container>
      </Box>
    </StickyBox>
  );
};

export default CarouselImage;
