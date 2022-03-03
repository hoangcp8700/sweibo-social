import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  Box,
  Stack,
  Divider,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  ListItemIcon,
  MenuList,
  styled,
} from "@mui/material";
import { StickySidebar, SidebarHeader, ToggleSidebar } from "components";
import { icons, data } from "constants";
import { useAuth } from "hooks";
import { MDrawer } from "components/MUI";

const sidebarWidth = 250;

const MenuItemStyle = styled(MenuItem)(({ active, theme }) => ({
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.sizes.base,
  backgroundColor:
    active === "true" ? theme.palette.background.opacity : "none",
  "&:hover": {
    backgroundColor: theme.palette.background.opacity,
  },
}));

const MenuSidebar = (props) => {
  const { handleToggleSidebar } = props;
  const location = useLocation();
  return (
    <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {data.sidebarSettings.map((item, index) => (
        <Typography
          key={`${item.title}-${index}`}
          component={Link}
          to={item.path}
          onClick={handleToggleSidebar}
        >
          <MenuItemStyle
            active={location.pathname === item.path ? "true" : "false"}
          >
            <ListItemIcon
              sx={{
                minWidth: 30,
                "& svg": {
                  fontSize: 22,
                  fill: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {item?.title}{" "}
            </Typography>
          </MenuItemStyle>
        </Typography>
      ))}
    </MenuList>
  );
};
const Setting = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = useAuth();
  const [isSidebarLeft, setIsSidebarLeft] = React.useState(true);

  const handleToggleSidebarLeft = () => setIsSidebarLeft(!isSidebarLeft);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        minHeight: (theme) => ({
          xs: `calc(100vh - ${
            theme.sizes.sidebarBottom + theme.sizes.header
          }px)`,
          sm2: `inherit`,
        }),
      }}
    >
      <ToggleSidebar
        isHiddenMobile={false}
        isShowSidebar={isSidebarLeft}
        handleToggleSidebar={handleToggleSidebarLeft}
      />

      <Stack
        direction="row"
        sx={{
          gap: { xs: 0, md: 1 },
          height: "100%",
        }}
        alignItems="flex-start"
      >
        {/* sidebar */}
        {matchesSM ? (
          <>
            <MDrawer
              anchor="left"
              open={isSidebarLeft}
              onClose={handleToggleSidebarLeft}
            >
              <Paper
                sx={{
                  minWidth: sidebarWidth,
                  pb: 3,
                  height: "100%",
                  bgcolor: "background.navbar",
                  // minHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
                }}
              >
                <Stack
                  sx={{
                    p: (theme) => theme.spacing(1, 1, 2),
                    gap: 1,
                  }}
                >
                  <SidebarHeader
                    title="Cài đặt chung"
                    handleToggleSidebar={handleToggleSidebarLeft}
                  />
                </Stack>

                <Divider />

                <MenuSidebar
                  handleToggleSidebar={matchesSM && handleToggleSidebarLeft}
                />
              </Paper>
            </MDrawer>
          </>
        ) : (
          <StickySidebar
            sx={{
              transition: "all 0.6s ease",
              transform: isSidebarLeft
                ? `translate3d(0px, 0px, 0px)`
                : `translate3d(-100%, 0px, 0px)`,
              bgcolor: "background.navbar",
              "& .content-scroll": {
                maxHeight: (theme) => ({
                  xs: `calc(100vh - ${
                    theme.sizes.sidebarBottom + theme.sizes.header
                  }px)!important`,
                  sm2: `calc(100vh - ${theme.sizes.header}px)!important`,
                }),
              },
            }}
          >
            <Box
              sx={{
                pb: 3,
                minWidth: sidebarWidth,
                minHeight: (theme) => ({
                  xs: `calc(100vh - ${
                    theme.sizes.header + theme.sizes.sidebarBottom
                  }px)`,
                  sm2: `calc(100vh - ${theme.sizes.header}px)`,
                }),
              }}
            >
              <Stack sx={{ p: (theme) => theme.spacing(1, 1, 2), gap: 1 }}>
                <SidebarHeader
                  title="Cài đăt chung"
                  handleToggleSidebar={handleToggleSidebarLeft}
                />
              </Stack>

              <Divider />

              <MenuSidebar
                handleToggleSidebar={matchesSM && handleToggleSidebarLeft}
              />
            </Box>
          </StickySidebar>
        )}

        {/* content */}
        <Box
          sx={[
            (theme) => ({
              flex: 1,
              display: "flex",
              height: "100%",
              maxHeight: (theme) => `calc(100vh - ${theme.sizes.header}px)`,
              overflow: "hidden",
              transition: "all 0.5s ease 0s",
              transform:
                isSidebarLeft || matchesSM
                  ? `translateX(0px)`
                  : `translateX(-260px)`,
              minWidth: !isSidebarLeft ? `100%` : 350,
            }),
          ]}
        >
          <Box
            sx={{
              px: 5,
              pb: 5,
              pt: 3,
              overflowY: "auto",
              height: "100%",
              width: "100%",
              maxHeight: (theme) => ({
                xs: `calc(100vh - ${
                  theme.sizes.header + theme.sizes.sidebarBottom
                }px)`,
                sm: `calc(100vh - ${theme.sizes.header}px)`,
              }),
              "&::-webkit-scrollbar-track": {
                // boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                bgcolor: (theme) => theme.palette.background.opacity,
              },

              "&::-webkit-scrollbar": {
                width: 15,
                backgroundColor: "transparent",
              },

              "&::-webkit-scrollbar-thumb": {
                bgcolor: (theme) => theme.palette.grey[500],
                borderRadius: "10px",
              },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Setting;
