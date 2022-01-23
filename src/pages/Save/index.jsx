import React from "react";
import { Box, Stack, Divider } from "@mui/material";
import { fakeData, data } from "constants";
import { SidebarHeader, SidebarList, StickySidebar } from "components";
import { Outlet } from "react-router-dom";

const Save = () => {
  const [collectionSave, setCollectionSave] = React.useState([]);

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
      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
        }}
        alignItems="flex-start"
      >
        <StickySidebar
          containerStyle={[
            (theme) => ({
              maxWidth: (theme) => theme.sizes.sidebar,
              minWidth: (theme) => theme.sizes.sidebar,
              mt: 3,
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }),
          ]}
          contentStyle={{ pl: 3 }}
        >
          <SidebarHeader title="Đã lưu" />
          <SidebarList lists={data.sidebarSave} />
          <Divider />
          <SidebarHeader title="Bộ sưu tập" />
          {collectionSave ? <SidebarList lists={collectionSave} /> : ""}
        </StickySidebar>

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default Save;
