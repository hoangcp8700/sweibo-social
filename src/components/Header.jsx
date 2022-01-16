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
} from "@mui/material";
import { icons } from "constants";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "constants/paths";
import MenuHeader from "components/MenuHeader/Main";
import MenuHeaderNotification from "components/MenuHeader/Notification";
import MenuHeaderMessage from "components/MenuHeader/Message";

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  "& svg": {
    fontSize: 18,
    fill: theme.palette.grey[600],
  },
}));

const Header = () => {
  const isSettingRef = useRef(null);
  const isNotificationRef = useRef(null);
  const isMessageRef = useRef(null);
  const [openMenu, setOpenMenu] = useState({
    isSetting: false,
    isNotification: false,
    isMessage: false,
  });

  const handleToggleAction = (name) => {
    setOpenMenu({
      ...openMenu,
      [name]: openMenu[name] === true ? false : true,
    });
  };

  return (
    <Paper sx={{ px: 3, py: 1, bgcolor: "background.navbar" }}>
      {/* menu header */}
      <MenuHeader
        anchor={isSettingRef}
        open={openMenu.isSetting}
        name="isSetting"
        handleClose={handleToggleAction}
      />
      <MenuHeaderNotification
        anchor={isSettingRef}
        open={openMenu.isNotification}
        name="isNotification"
        handleClose={handleToggleAction}
      />
      <MenuHeaderMessage
        anchor={isMessageRef}
        open={openMenu.isMessage}
        name="isMessage"
        handleClose={handleToggleAction}
      />
      {/* content */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="h6"
            color="primary"
            component={Link}
            to={PATH_PAGE.home.path}
          >
            WeiboSocial
          </Typography>

          <Box>
            <TextField
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
            />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={[
              (theme) => ({
                [theme.breakpoints.down("md")]: {
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
            <Avatar sx={{ width: 32, height: 32 }} />
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              Hoàng
            </Typography>
          </Box>
          <Badge badgeContent={4} color="primary">
            <IconButtonStyle
              ref={isMessageRef}
              onClick={() => handleToggleAction("isMessage")}
            >
              {icons.ChatIcon}
            </IconButtonStyle>
          </Badge>
          <Badge badgeContent={4} color="primary">
            <IconButtonStyle
              ref={isNotificationRef}
              onClick={() => handleToggleAction("isNotification")}
            >
              {icons.NotificationIcon}
            </IconButtonStyle>
          </Badge>
          <IconButtonStyle
            ref={isSettingRef}
            onClick={() => handleToggleAction("isSetting")}
          >
            {icons.ArrowDropDownIcon}
          </IconButtonStyle>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Header;
