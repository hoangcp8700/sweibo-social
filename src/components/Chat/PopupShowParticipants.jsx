import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useChat, useUser } from "hooks";
import { InfiniteScroll } from "providers";
import { FriendItem } from "components";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  length: 0,
};

export default function PopupShowParticipants(props) {
  const { onClose, open, room } = props;
  const { handleGetParticipants } = useChat();
  const [paginate, setPaginate] = React.useState(initialize); // friends

  const handleGetParticipantsCustom = async () => {
    if (!paginate.hasNextPage) return;
    const response = await handleGetParticipants(paginate.page, room?._id);

    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  };

  React.useEffect(() => {
    if (!open || !room?._id) return;
    handleGetParticipantsCustom();

    return () => {
      setPaginate(initialize);
    };
  }, [open, room?._id]);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>Thành viên</DialogTitle>
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
          asd
          {/* {paginate?.totalLength > 0 ? (
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
          )} */}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
