import React from "react";
import queryString from "query-string";
import { useSnackbar } from "notistack";

import { FriendItem, PopupAgainDelete } from "components";
import {
  Box,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { icons } from "constants";
import { useLocation } from "react-router-dom";
import { useUser, useAuth } from "hooks";
import { MButton } from "components/MUI";
import { data } from "constants";
import { InfiniteScroll } from "providers";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
};

const FriendProfile = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const {
    handleGetFriends,
    userClient,
    handleUpdateStatusFriend,
    handleDeleteFriend,
    handleGetFriendRelationship,
  } = useUser();

  const [paginate, setPaginate] = React.useState(initialize); // friends

  const userProfile = userClient || user;

  const [tag, setTag] = React.useState("active");
  const [openAgainDelete, setOpenAgainDelete] = React.useState({
    open: false,
    id: null,
    message: "",
  });

  const handleGetFriendsCustom = async () => {
    if (!paginate.hasNextPage) return;
    const response = await handleGetFriends(
      paginate.page,
      tag,
      userProfile?._id
    );

    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  React.useEffect(() => {
    handleGetFriendsCustom();
  }, [tag]);

  const handleChangeTag = (value) => {
    setPaginate(initialize);
    setTag(value);
  };
  const handleOpenAgainDelete = (id = null, message = "") =>
    setOpenAgainDelete({ open: !openAgainDelete.open, id, message });

  const handleUpdateStatusFriendCustom = async (friendID) => {
    const response = await handleUpdateStatusFriend(friendID);
    console.log("handleUpdateStatusFriendCustom", response);

    const newData = paginate.data.map((item) => {
      if (item?._id !== response?._id) return item;
      return response;
    });
    setPaginate({ ...paginate, data: newData });
  };

  const handleDeleteFriendCustom = async (friendID, isAccept, message) => {
    if (!isAccept) return handleOpenAgainDelete(friendID, message);
    const response = await handleDeleteFriend(friendID);
    console.log(response);
    if (response) {
      const newFriends = paginate.data.filter((item) => item?._id !== friendID);
      setPaginate({ ...paginate, data: newFriends });
      enqueueSnackbar(response.message, { variant: "success" });
      handleOpenAgainDelete();
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "background.navbar",
        borderRadius: (theme) => theme.sizes.minbase,
      }}
    >
      <PopupAgainDelete
        handleAccept={() => handleDeleteFriendCustom(openAgainDelete?.id, true)}
        open={openAgainDelete?.open}
        onClose={() => handleOpenAgainDelete()}
        title="Hủy kết bạn"
        label={openAgainDelete?.message}
      />

      <Box sx={{ position: "relative", mb: 2 }}>
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            px: 2,
            alignItems: { xs: "flex-start", sm: "center" },
          }}
          justifyContent="space-between"
        >
          <Typography variant="h6">Bạn bè</Typography>
          <TextField
            sx={{
              width: { xs: "100%", sm: "auto" },
              "& input": { py: 1, fontSize: 14 },
              "& .MuiOutlinedInput-root": {
                borderRadius: (theme) => theme.sizes.radius,
              },
            }}
            placeholder="Tìm kiếm"
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
        </Stack>
      </Box>

      <Box sx={{ px: 2, mb: 3 }}>
        <Stack sx={{ flexDirection: { xs: "column", mobile: "row" }, gap: 1 }}>
          {data?.menuFriends?.map((item, index) => {
            const match = item.value === tag;
            return (
              <MButton
                key={item.label}
                sx={{
                  px: 3,
                  position: "relative",
                  "&:hover": {
                    bgcolor: "background.opacity",
                  },
                }}
                onClick={() => handleChangeTag(item.value)}
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

      <Box
        sx={{
          "& .infinite-scroll-component": {
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(300px, 1fr) )",
              md: "repeat(auto-fill, minmax(400px, 1fr) )",
            },
            gap: 2,
            px: 2,
          },
        }}
      >
        {paginate?.totalLength > 0 ? (
          <InfiniteScroll
            hasNextPage={paginate?.hasNextPage}
            data={paginate?.data}
            fetch={handleGetFriendsCustom}
            // endMessage={`Tổng cộng ${paginate?.totalLength} bài viết`}
          >
            {paginate?.data?.map((item) => (
              <FriendItem
                key={item.id}
                item={item}
                user={userProfile}
                isAuth={user?._id === userProfile?._id}
                handleUpdateStatusFriend={handleUpdateStatusFriendCustom}
                handleDeleteFriend={handleDeleteFriendCustom}
              />
            ))}
          </InfiniteScroll>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
};

export default FriendProfile;
