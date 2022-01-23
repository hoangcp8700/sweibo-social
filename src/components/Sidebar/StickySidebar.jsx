import React from "react";
import StickyBox from "react-sticky-box";

import { Box, Stack, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  maxWidth: theme.sizes.sidebar,
  width: "100%",
  height: "100%",
  "& .content-scroll": {
    height: "100%",
    overflowY: "scroll",
    maxHeight: `calc(100vh - ${theme.sizes.header}px)`,
    "&:hover": {
      "&::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.background.opacity,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[500],
      },
    },

    "&::-webkit-scrollbar-track": {
      // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "transparent",
    },

    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "transparent",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: theme.spacing(3),
      backgroundColor: "transparent",
      height: 20,
    },
  },
}));

const StickySidebarCustom = ({
  isShowSidebar,
  containerStyle,
  contentStyle,
  children,
  sx,
}) => {
  return (
    <Box sx={{ position: "relative", zIndex: 2, ...sx }}>
      <StickyBox>
        <Container sx={containerStyle}>
          <Stack spacing={1} className="content-scroll" sx={contentStyle}>
            {children}
          </Stack>
        </Container>
      </StickyBox>
    </Box>
  );
};

export default StickySidebarCustom;
