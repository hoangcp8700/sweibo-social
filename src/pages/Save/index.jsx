import React from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
import { fakeData, data } from "constants";
import {
  SidebarHeader,
  SidebarList,
  StickySidebar,
  ToggleSidebar,
} from "components";
import { Outlet } from "react-router-dom";
import { MButton } from "components/MUI";
import { lineClampStyle } from "utils/lineClampStyle";
import { icons } from "constants";

const Save = () => {
  const [collectionSave, setCollectionSave] = React.useState([]);
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

  const handleToggleSidebarLeft = () => {
    console.log("setIsSidebarLeft(!isSidebarLeft)");
    setIsSidebarLeft(!isSidebarLeft);
  };

  React.useEffect(() => {
    const getCollections = async () => {
      const reponse = await fakeData.GET_COLLECTION_SAVE();
      console.log("collectionSave", reponse);

      setCollectionSave(reponse);
    };
    getCollections();
  }, []);

  return (
    <Box>
      <ToggleSidebar
        isShowSidebar={isSidebarLeft}
        handleToggleSidebar={handleToggleSidebarLeft}
      />
      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
        }}
        alignItems="flex-start"
      >
        <StickySidebar
          sx={{
            transition: "all 0.6s ease",
            transform: isSidebarLeft
              ? `translate3d(0px, 0px, 0px)`
              : `translate3d(-100%, 0px, 0px)`,
          }}
          containerStyle={[
            (theme) => ({
              maxWidth: (theme) => theme.sizes.sidebar,
              minWidth: (theme) => theme.sizes.sidebar,

              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{
            px: 1,
            py: 2,
            minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
          }}
        >
          <SidebarHeader
            title="Đã lưu"
            handleToggleSidebar={handleToggleSidebarLeft}
          />
          <SidebarList lists={data.sidebarSave} />
          <Divider />
          <SidebarHeader title="Bộ sưu tập" isBack={false} />
          {collectionSave ? <SidebarList lists={collectionSave} /> : ""}
          <MButton
            startIcon={icons.AddIcon}
            variant="contained"
            sx={{
              "& svg": { fill: (theme) => theme.palette.text.primary },
              bgcolor: "background.opacity1",
              "&:hover": {
                bgcolor: "background.opacity2",
              },
              borderRadius: (theme) => theme.sizes.minBase,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ ...lineClampStyle(1), color: "text.primary" }}
            >
              Thêm bộ sưu tập
            </Typography>
          </MButton>
        </StickySidebar>

        <Box
          sx={[
            (theme) => ({
              position: "relative",
              flex: 1,
              transition: "all 0.5s ease 0s",
              transform: !isSidebarLeft
                ? `translateX(-350px)`
                : `translateX(0)`,
              minWidth: !isSidebarLeft ? `100%` : `inherit`,
              [theme.breakpoints.down("md")]: {
                transform: `translateX(0)`,
              },
            }),
          ]}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Save;
