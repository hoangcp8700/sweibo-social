import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useUser } from "hooks";
import { InfiniteScroll } from "providers";
import { FriendItem } from "components";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
  userID: null,
};

export default function PopupEditProfile(props) {
  const { onClose, open, user, handleUpdateFollowersLength } = props;
  const { handleGetFriends, handleUpdateStatusFriend, handleDeleteFriend } =
    useUser();

  const [paginate, setPaginate] = React.useState(initialize); // friends

  const handleGetFriendsCustom = async () => {
    if (!paginate.hasNextPage) return;
    const response = await handleGetFriends(paginate.page, "accept", user?._id);

    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
      userID: user?._id,
    });
  };

  React.useEffect(() => {
    if (!open || !user) return;
    handleGetFriendsCustom();
    return () => {
      setPaginate(initialize);
    };
  }, [open]);

  const handleUpdateStatusFriendCustom = React.useCallback(
    async (friendID) => {
      await handleUpdateStatusFriend(friendID);
      const newData = paginate.data.filter((item) => item?._id !== friendID);
      setPaginate({
        ...paginate,
        data: newData,
        totalLength: paginate.totalLength - 1,
      });
      handleUpdateFollowersLength();
    },
    [paginate]
  );

  const handleDeleteFriendCustom = React.useCallback(
    async (friendID, isAccept, message) => {
      await handleDeleteFriend(friendID);
      const newFriends = paginate.data.filter((item) => item?._id !== friendID);
      setPaginate({
        ...paginate,
        data: newFriends,
        totalLength: paginate.totalLength - 1,
      });
      handleUpdateFollowersLength();
    },
    [paginate]
  );
  console.log("paginate", paginate);
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>Người theo dõi</DialogTitle>
      <Divider />
      <DialogContent>
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
                  user={user}
                  handleUpdateStatusFriend={handleUpdateStatusFriendCustom}
                  handleDeleteFriend={handleDeleteFriendCustom}
                />
              ))}
            </InfiniteScroll>
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
