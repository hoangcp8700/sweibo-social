import React from "react";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  AvatarGroup,
  Avatar,
  Typography,
  Divider,
  styled,
  IconButton,
} from "@mui/material";
import { icons, data } from "constants";
import { PATH_PAGE } from "constants/paths";
import { useUser, useAuth } from "hooks";
import handleUploadFile from "utils/uploadFile";

import { MButton } from "components/MUI";
import {
  LoadingEllipsis,
  LoadingEllipsisElement,
  AvatarDetail,
} from "components";

const AvatarGroupStyle = styled(AvatarGroup)(() => ({
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    fontSize: 12,
    fontWeight: 700,
  },
}));

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { handleGetUserByEmail } = useUser();
  const { user, handleUploadAvatar } = useAuth();

  const menuProfileRef = React.useRef();
  const uploadAvatarRef = React.useRef();

  const [pageLoading, setPageLoading] = React.useState(true);
  const [avatarLoading, setAvatarLoading] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState(null);
  const [avatarDetail, setAvatarDetail] = React.useState(null);

  const parsed = queryString.parse(location?.search);
  const isAuth = parsed?.email && parsed?.email !== user?.email ? false : true;

  React.useEffect(() => {
    const getProfile = async () => {
      if (!isAuth) {
        const response = await handleGetUserByEmail(parsed?.email);
        console.log("response profile", response);
        if (!response) {
          return navigate("/404");
        }
        setUserProfile(response);
      } else {
        setUserProfile(user);
      }
      setPageLoading(false);
    };

    getProfile();
    return () => {
      setPageLoading(true);
      setUserProfile(null);
    };
  }, [location, params]);

  const handleRedirect = (key) => {
    const check = location.pathname.includes(
      `/${PATH_PAGE.friend.link}/${PATH_PAGE.profile.link}`
    );

    const urlDefault = `/${PATH_PAGE.profile.link}/${key}${
      location.search || ""
    }`;

    check
      ? navigate(`/${PATH_PAGE.friend.link}${urlDefault}`)
      : navigate(urlDefault);

    setTimeout(() => {
      menuProfileRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }, 500);
  };

  const handleUploadFileAvatar = async (e) => {
    setAvatarLoading(true);
    try {
      const response = await handleUploadFile(e);
      if (response.error) {
        setAvatarLoading(false);
        return enqueueSnackbar(response.message, { variant: "error" });
      }
      const newAvatar = await handleUploadAvatar(response);
      setAvatarDetail(newAvatar);
      setAvatarLoading(false);
    } catch (error) {
      console.log("err", error);
      setAvatarLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingEllipsis />;
  }

  const handleShowAvatar = (isNull = false) => {
    setAvatarDetail(!isNull ? userProfile.avatar : null);
  };

  return (
    <Box>
      <AvatarDetail
        open={Boolean(avatarDetail)}
        avatar={avatarDetail}
        onClose={() => handleShowAvatar(true)}
        isLoading={avatarLoading}
        handleUploadAvatar={() => uploadAvatarRef.current.click()}
      />

      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          m: "0 auto",
        }}
      >
        <Paper
          sx={{
            bgcolor: "background.navbar",
          }}
        >
          <Box
            sx={{
              maxWidth: (theme) => theme.breakpoints.values.md,
              m: "0 auto",
            }}
          >
            {/* banner and avatar  */}
            <Paper
              sx={[
                { overflow: "hidden" },
                (theme) => ({
                  borderRadius: 0,
                  borderBottomLeftRadius: theme.sizes.base,
                  borderBottomRightRadius: theme.sizes.base,
                }),
              ]}
            >
              {/* // anh bia */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 150, mobile: 200, sm: 300 },
                }}
              >
                <Paper
                  elevation={0}
                  sx={[
                    (theme) => ({
                      borderRadius: 0,
                      borderBottomLeftRadius: theme.sizes.base,
                      borderBottomRightRadius: theme.sizes.base,
                      width: "100%",
                      height: "100%",
                      bgcolor: "background.opacity2",
                    }),
                  ]}
                />
                {isAuth ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 15, sm: "80%" },
                      right: { xs: 20, sm: 40 },
                    }}
                  >
                    <MButton startIcon={icons.CameraIcon} variant="contained">
                      Thêm ảnh bìa
                    </MButton>
                  </Box>
                ) : (
                  ""
                )}
                {/* <img
                  src={avatar}
                  alt="banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                /> */}
              </Box>
            </Paper>

            <Stack
              sx={[
                {
                  mt: -5,
                  px: 3,
                  alignItems: { xs: "center", sm: "flex-start" },
                },
                (theme) => ({ [theme.breakpoints.down("375")]: { px: 1 } }),
              ]}
            >
              {/* avatar and info */}
              <Stack
                sx={{
                  width: "100%",
                  gap: 2,
                  // flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  alignItems: { xs: "center", sm: "flex-end" },
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      width: { xs: 120, sm: 168 },
                      height: { xs: 120, sm: 168 },
                    }}
                  >
                    {avatarLoading ? (
                      <Box
                        sx={{
                          height: "100%",
                          borderRadius: "50%",
                          border: (theme) =>
                            `3px solid ${theme.palette.background.paper}`,
                          boxShadow: (theme) => theme.shadows[5],
                        }}
                      >
                        <LoadingEllipsisElement />
                      </Box>
                    ) : (
                      <Avatar
                        onClick={() => handleShowAvatar()}
                        src={userProfile?.avatar?.url}
                        alt="avatar"
                        sx={{
                          width: "100%",
                          height: "100%",
                          border: (theme) =>
                            `3px solid ${theme.palette.background.paper}`,
                          boxShadow: (theme) => theme.shadows[5],
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </Box>

                  {/* button upload avatar */}
                  {isAuth ? (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: { xs: 5, sm: 10 },
                        right: { xs: -5, sm: 0 },
                      }}
                    >
                      <Paper
                        elevation={5}
                        sx={{
                          bgcolor: "background.default",
                          borderRadius: "50%",
                          border: (theme) =>
                            `2px solid ${theme.palette.background.main}`,
                        }}
                      >
                        <IconButton
                          onClick={() => uploadAvatarRef.current.click()}
                          sx={{
                            "& svg": {
                              fill: (theme) => theme.palette.text.secondary,
                              fontSize: { xs: 16, sm: 20 },
                            },
                          }}
                        >
                          {icons.CameraIcon}
                        </IconButton>
                      </Paper>
                      <input
                        type="file"
                        accept="image/*"
                        ref={uploadAvatarRef}
                        style={{ display: "none" }}
                        onChange={handleUploadFileAvatar}
                      />
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
                <Stack
                  sx={{
                    flexGrow: 1,
                    mb: { xs: 0, sm: 2 },
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h3">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </Typography>
                    {userProfile?.nickName ? (
                      <Typography variant="h4" sx={{ fontWeight: 400 }}>
                        ({userProfile?.nickName})
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>3.8k bạn bè</Typography>
                    <Typography sx={{ fontWeight: 700 }}>•</Typography>
                    <Typography>131 bạn chung</Typography>
                  </Stack>

                  <Stack
                    alignItems="center"
                    sx={{
                      flexWrap: "wrap",
                      gap: { xs: 2, sm: 1 },
                      width: "100%",
                      justifyContent: { xs: "center", sm: "space-between" },
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <AvatarGroupStyle max={6}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroupStyle>

                    {!isAuth ? (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MButton
                          startIcon={icons.PersonIcon}
                          variant="contained"
                          sx={{
                            bgcolor: "background.opacity1",
                            color: "text.primary",
                            "&:hover": {
                              bgcolor: "background.opacity2",
                            },
                          }}
                        >
                          Bạn bè
                        </MButton>
                        <MButton
                          startIcon={icons.MessageIcon}
                          variant="contained"
                        >
                          Nhắn tin
                        </MButton>
                      </Stack>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Divider sx={{ mt: 2, mx: 3 }} />

            {/* //menu */}
            <Box sx={{ px: 3, mt: 0.5 }}>
              <Stack direction="row" spacing={1} ref={menuProfileRef}>
                {data?.menuProfile?.map((item, index) => {
                  const match = location.pathname.includes(item.value);
                  return (
                    <MButton
                      key={item.label}
                      sx={{
                        py: 1,
                        position: "relative",

                        flex: 1,
                        "&:hover": {
                          bgcolor: "background.opacity",
                        },
                      }}
                      onClick={() => handleRedirect(item.value)}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: match ? "primary.main" : "text.primary" }}
                      >
                        {item.label}
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          borderBottom: (theme) =>
                            `3px solid ${theme.palette.primary.main}`,
                          bgcolor: "primary.main",
                          width: match ? "100%" : "0%",
                          height: 3,
                          transition: "width .3s",
                        }}
                      />
                    </MButton>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            maxWidth: (theme) => theme.breakpoints.values.md,
            m: "0 auto",
            mt: 2,
            px: { xs: 1, sm: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
