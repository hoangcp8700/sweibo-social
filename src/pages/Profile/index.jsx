import React from "react";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
  PopupAgainDelete,
  PopupMenu,
} from "components";

const ButtonFriend = React.forwardRef((props, ref) => {
  const {
    icon = icons.PersonIcon,
    submitting,
    sx,
    label,
    ...restProps
  } = props;
  return (
    <MButton
      ref={ref}
      loading={submitting}
      disabled={submitting}
      startIcon={icon}
      variant="contained"
      sx={{
        bgcolor: "background.opacity1",
        color: "text.primary",
        "&:hover": {
          bgcolor: "background.opacity2",
        },
        ...sx,
      }}
      {...restProps}
    >
      {label}
    </MButton>
  );
});

const ActionFriend = (props) => {
  const { titleLeft, titleRight, subbmitting, onAccept, onCancel } = props;
  return (
    <Stack direction="row-reverse" sx={{ flexWrap: "wrap", gap: 1 }}>
      <MButton
        loading={subbmitting}
        disabled={subbmitting}
        variant="contained"
        color="primary"
        sx={{ py: 0.5 }}
        onClick={onAccept}
      >
        {titleLeft}
      </MButton>
      <MButton
        loading={subbmitting}
        disabled={subbmitting}
        variant="cancel"
        sx={{ py: 0.5 }}
        onClick={onCancel}
      >
        {titleRight}
      </MButton>
    </Stack>
  );
};

let userProfile;
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const {
    userClient,
    handleGetUserByEmail,
    handleUpdateUserClient,
    handleGetFriendRelationship,
    handleAddFriend,
    handleDeleteFriend,
    handleUpdateStatusFriend,
  } = useUser();
  const {
    user,
    handleUploadAvatar,
    handleRemoveAvatar,
    handleUploadThumnail,
    handleUpdateAuth,
  } = useAuth();

  const menuProfileRef = React.useRef();
  const uploadAvatarRef = React.useRef();
  const uploadThumnailRef = React.useRef();
  const friendMenuRef = React.useRef();

  const [pageLoading, setPageLoading] = React.useState(true);
  const [avatarLoading, setAvatarLoading] = React.useState(false);
  const [thumbnaiLoading, setThumbnaiLoading] = React.useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = React.useState(false);
  const [isOpenFriendMenu, setIsOpenFriendMenu] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [openAgainDelete, setOpenAgainDelete] = React.useState({
    open: false,
    id: null,
    message: "",
  });

  const parsed = queryString.parse(location?.search);
  const isAuth = parsed?.email && parsed?.email !== user?.email ? false : true;
  userProfile = userClient || user;

  React.useEffect(() => {
    const getProfile = async () => {
      console.log(
        "isAuth && userClient && !parsed?.email",
        isAuth,
        userClient,
        !parsed?.email
      );
      if (isAuth && userClient && !parsed?.email) {
        handleUpdateUserClient(null);
      }
      if (isAuth && parsed?.email === user?.email) {
        return navigate(`/${PATH_PAGE.profile.link}/posts`);
      }
      if (isAuth) return setPageLoading(false);

      console.log("reload profile");

      const response = await handleGetUserByEmail(parsed?.email);
      if (!response) return navigate("/404");
      const getRelationship = await handleGetFriendRelationship(response?._id);
      handleUpdateUserClient({
        ...response,
        isFriend: getRelationship.data,
      });
      setPageLoading(false);
    };

    getProfile();
  }, [location]);

  if ((pageLoading && !userClient) || userClient?.email !== parsed?.email) {
    return <LoadingEllipsis />;
  }

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
      const newAvatar = await handleUploadAvatar(response[0].file);
      handleUpdateAuth(newAvatar);
      setAvatarLoading(false);
    } catch (error) {
      console.log("err", error);
      setAvatarLoading(false);
    }
  };

  const handleUploadFileThumbail = async (e) => {
    setThumbnaiLoading(true);
    try {
      const response = await handleUploadFile(e);
      if (response.error) {
        setThumbnaiLoading(false);
        return enqueueSnackbar(response.message, { variant: "error" });
      }
      const newThumnail = await handleUploadThumnail(response[0].file);
      handleUpdateAuth(newThumnail);
      setThumbnaiLoading(false);
    } catch (error) {
      console.log("err", error);
      setThumbnaiLoading(false);
    }
  };

  const handleToggleShowAvatar = () => setIsOpenAvatar(!isOpenAvatar);
  const handleToggleOpenFriendMenu = () =>
    setIsOpenFriendMenu(!isOpenFriendMenu);

  const handleRemoveAvatarCustom = async () => {
    await handleRemoveAvatar();
    handleToggleShowAvatar();
  };

  /// -------------------- friend --------------------------
  const handleOpenAgainDelete = (id = null, message = "") =>
    setOpenAgainDelete({ open: !openAgainDelete.open, id, message });

  const handleAddFriendCustom = async (targetID) => {
    setSubmitting(true);
    const response = await handleAddFriend(targetID);
    setSubmitting(false);

    if (response) {
      handleUpdateUserClient({
        ...userClient,
        isFriend: response.data,
      });

      enqueueSnackbar(response.message, { variant: "success" });
    }
  };

  const handleDeleteFriendCustom = async (friendID, isAccept, message) => {
    if (!isAccept) return handleOpenAgainDelete(friendID, message);
    setSubmitting(true);
    const response = await handleDeleteFriend(friendID);
    setSubmitting(false);

    if (response) {
      handleUpdateUserClient({
        ...userClient,
        isFriend: null,
      });
      enqueueSnackbar(response.message, { variant: "success" });
      handleOpenAgainDelete();
    }
  };

  const handleUpdateStatusFriendCustom = async (friendID) => {
    setSubmitting(true);
    const response = await handleUpdateStatusFriend(friendID);
    setSubmitting(false);

    if (response) {
      handleUpdateUserClient({
        ...userClient,
        isFriend: response.data,
      });

      enqueueSnackbar(response.message, { variant: "success" });
    }
  };
  return (
    <Box>
      <AvatarDetail
        isAuth={isAuth}
        open={isOpenAvatar}
        avatar={
          userProfile?.avatar?.detail?.custom[0] || userProfile?.avatar?.url
        }
        onClose={handleToggleShowAvatar}
        isLoading={avatarLoading}
        handleUploadAvatar={() => uploadAvatarRef.current.click()}
        handleRemoveAvatar={handleRemoveAvatarCustom}
      />

      <PopupAgainDelete
        handleAccept={() => handleDeleteFriendCustom(openAgainDelete?.id, true)}
        open={openAgainDelete?.open}
        onClose={() => handleOpenAgainDelete()}
        title="Hủy kết bạn"
        label={openAgainDelete?.message}
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
                {thumbnaiLoading ? (
                  <Box
                    sx={{
                      height: "100%",
                    }}
                  >
                    <LoadingEllipsisElement />
                  </Box>
                ) : (
                  ""
                )}
                {!userProfile?.coverImage?.url ? (
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
                ) : (
                  <img
                    src={userProfile?.coverImage?.url}
                    alt="banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}

                {isAuth ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 15, sm: "80%" },
                      right: { xs: 20, sm: 40 },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={uploadThumnailRef}
                      style={{ display: "none" }}
                      onChange={handleUploadFileThumbail}
                    />
                    <MButton
                      startIcon={icons.CameraIcon}
                      variant="contained"
                      onClick={() => uploadThumnailRef.current.click()}
                    >
                      Thêm ảnh bìa
                    </MButton>
                  </Box>
                ) : (
                  ""
                )}
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
                        onClick={handleToggleShowAvatar}
                        src={userProfile?.avatar?.url}
                        alt="avatar"
                        sx={{
                          width: "100%",
                          height: "100%",
                          border: (theme) =>
                            `3px solid ${theme.palette.background.paper}`,
                          boxShadow: (theme) => theme.shadows[5],
                          cursor: "pointer",
                          pointerEvents: userProfile?.avatar?.url
                            ? "auto"
                            : "none",
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
                    zIndex: 5,
                    mb: { xs: 0, sm: isAuth ? 3 : "" },
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Stack>
                    <Typography
                      variant="h3"
                      sx={{ textAlign: { xs: "center", sm: "inherit" } }}
                    >
                      {userProfile?.firstName} {userProfile?.lastName}
                    </Typography>
                    {userProfile?.nickName ? (
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 400,
                          mt: -0.5,
                          mb: 0.5,
                          textAlign: { xs: "center", sm: "inherit" },
                        }}
                      >
                        ({userProfile?.nickName})
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Stack>
                  {/* // friends */}
                  {!isAuth ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: userClient?.nickName ? 1 : 3 }}
                    >
                      {!userClient?.isFriend ? (
                        <ButtonFriend
                          submitting={submitting}
                          onClick={() => handleAddFriendCustom(userClient?._id)}
                          label="Kết bạn"
                          icon={icons.PersonAddIcon}
                        />
                      ) : (
                        <Stack>
                          {userClient?.isFriend?.status === "Active" ? (
                            <>
                              <PopupMenu
                                ref={friendMenuRef}
                                open={isOpenFriendMenu}
                                onClose={handleToggleOpenFriendMenu}
                                placement="top-start"
                                onClick={() =>
                                  handleDeleteFriendCustom(
                                    userClient?.isFriend?._id,
                                    false,
                                    "Bạn đã chắc chắn muốn hủy kết bạn người này chưa?"
                                  )
                                }
                                lists={[
                                  {
                                    label: "Hủy kết bạn",
                                    value: "delete-friend",
                                    icon: icons.PersonRemoveIcon,
                                  },
                                ]}
                              />

                              <ButtonFriend
                                submitting={submitting}
                                ref={friendMenuRef}
                                onClick={handleToggleOpenFriendMenu}
                                label="Bạn bè"
                                icon={icons.PersonIcon}
                                sx={{
                                  bgcolor: "primary.main",
                                  color: "common.white",
                                  "&:hover": { bgcolor: "primary.dark" },
                                }}
                              />
                            </>
                          ) : userClient?.isFriend?.status === "Waiting" &&
                            userClient?.isFriend?.createdBy !==
                              userProfile?._id ? (
                            <>
                              <PopupMenu
                                ref={friendMenuRef}
                                open={isOpenFriendMenu}
                                onClose={handleToggleOpenFriendMenu}
                                placement="top-start"
                                onClick={() =>
                                  handleDeleteFriendCustom(
                                    userClient?.isFriend?._id,
                                    false,
                                    "Bạn đã chắc chắn muốn hủy yêu cầu kết bạn người này?"
                                  )
                                }
                                lists={[
                                  {
                                    label: "Hủy yêu cầu",
                                    value: "delete-friend",
                                    icon: icons.PersonRemoveIcon,
                                  },
                                ]}
                              />

                              <ButtonFriend
                                submitting={submitting}
                                ref={friendMenuRef}
                                onClick={handleToggleOpenFriendMenu}
                                label="Đang chờ chấp nhận"
                                icon={icons.PersonIcon}
                                sx={{
                                  bgcolor: "primary.main",
                                  color: "common.white",
                                  "&:hover": { bgcolor: "primary.dark" },
                                }}
                              />
                            </>
                          ) : (
                            <ActionFriend
                              submitting={submitting}
                              titleLeft="Chấp nhận lời mời"
                              titleRight="Xóa lời mời"
                              onAccept={() =>
                                handleUpdateStatusFriendCustom(
                                  userClient?.isFriend?._id
                                )
                              }
                              onCancel={() =>
                                handleDeleteFriendCustom(
                                  userClient?.isFriend?._id,
                                  false,
                                  "Bạn đã chắc chắn muốn gỡ yêu cầu kết bạn từ người này?"
                                )
                              }
                            />
                          )}
                        </Stack>
                      )}
                    </Stack>
                  ) : (
                    ""
                  )}
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
            pb: 5,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
