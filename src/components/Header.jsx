import React, { useState, useRef } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { icons } from "constants";
import { styled } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_PAGE } from "constants/paths";

import MenuHeader from "components/Header/MenuMain";
import MenuHeaderNotification from "components/Header/MenuNotification";
import PopupSearchResult from "components/Header/PopupSearchResult";
import { useAuth, useUser } from "hooks";

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  "& svg": {
    fontSize: 18,
    fill: theme.palette.grey[600],
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();
  const { handleGetUserExeptToMe } = useUser();
  const isSettingRef = useRef(null);
  const searchResultRef = useRef(null);

  // const isNotificationRef = useRef(null);
  const [openMenu, setOpenMenu] = useState({
    isSetting: false,
    isNotification: false,
    isSearchResult: false,
  });

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  const handleGetUsersCustom = React.useCallback(
    async (params) => {
      const response = await handleGetUserExeptToMe(1, params);
      return setSearchResult(response);
    },
    [search]
  );

  const handleToggleAction = React.useCallback(
    (name) => {
      setOpenMenu({
        ...openMenu,
        [name]: openMenu[name] === true ? false : true,
      });
    },
    [openMenu]
  );

  const handleRedirectProfile = (name) => {
    navigate(`${PATH_PAGE.profile.link}/posts`);
    name && handleToggleAction(name);
  };

  const handleLogoutCustom = async () => {
    await handleLogout();
    navigate(PATH_AUTH.login.path);
  };

  let timer;
  const handleChangeSearch = async (e) => {
    const { value } = e.target;
    if (timer) {
      clearTimeout(timer);
    }
    setSearch(value);
    if (!value) {
      return setSearchResult([]);
    }

    timer = setTimeout(() => handleGetUsersCustom(`&search=${value}`), 1000);
  };

  return (
    <>
      <Paper
        sx={{
          px: 3,
          py: 1,
          borderRadius: 0,
          bgcolor: "background.navbar",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: (theme) => theme.sizes.header,
        }}
      >
        <Stack
          sx={{
            maxWidth: (theme) => theme.breakpoints.values.xl,
            height: "100%",
            m: "auto",
          }}
          justifyContent="center"
        >
          {/* menu header */}
          <MenuHeader
            anchor={isSettingRef}
            open={openMenu.isSetting}
            name="isSetting"
            handleClose={handleToggleAction}
            handleRedirectProfile={handleRedirectProfile}
            handleLogout={handleLogoutCustom}
          />
          <MenuHeaderNotification
            anchor={isSettingRef}
            open={openMenu.isNotification}
            name="isNotification"
            handleClose={handleToggleAction}
          />

          <PopupSearchResult
            anchor={searchResultRef}
            open={openMenu.isSearchResult}
            name="isSearchResult"
            handleClose={handleToggleAction}
            lists={searchResult}
          />

          {/* content */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
              <Typography
                variant="h6"
                color="primary"
                component={Link}
                to={PATH_PAGE.home.path}
              >
                Weibo
              </Typography>

              <Box>
                <TextField
                  autoComplete="off"
                  onClick={() => handleToggleAction("isSearchResult")}
                  ref={searchResultRef}
                  sx={{
                    "& input": { py: 1, fontSize: 14 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: (theme) => theme.sizes.radius,
                    },
                  }}
                  placeholder="Tìm kiếm trong Weibo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton sx={{ "& svg": { fontSize: 20 } }}>
                          {icons.SearchIcon}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={handleChangeSearch}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                onClick={() => handleRedirectProfile()}
                sx={[
                  (theme) => ({
                    [theme.breakpoints.down("sm")]: {
                      display: "none",
                    },
                  }),
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    py: 0.5,
                    px: 2,
                    cursor: "pointer",
                    transition: "background 300ms",
                    borderRadius: (theme) => theme.sizes.radius,
                    "&:hover": {
                      bgcolor: "grey.200",
                      "& .MuiTypography-root": {
                        color: (theme) =>
                          theme.palette.mode === "dark"
                            ? "background.navbar"
                            : "text.primary",
                      },
                    },
                  },
                ]}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={user?.avatar?.url}
                />
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {user?.lastName}
                </Typography>
              </Box>

              {/* <Badge badgeContent={4} color="primary">
                <IconButtonStyle
                  ref={isNotificationRef}
                  onClick={() => handleToggleAction("isNotification")}
                >
                  {icons.NotificationIcon}
                </IconButtonStyle>
              </Badge> */}
              <IconButtonStyle
                ref={isSettingRef}
                onClick={() => handleToggleAction("isSetting")}
              >
                {icons.ArrowDropDownIcon}
              </IconButtonStyle>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <Box sx={{ height: (theme) => theme.sizes.header, width: "100%" }} />
    </>
  );
};

export default Header;
