import * as React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  Stack,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  DialogActions,
} from "@mui/material";

import { MButton } from "components/MUI";
import { LoadingEllipsisElement, LoadingEllipsis } from "components";
import { useChat, useUser } from "hooks";
import { InfiniteScroll } from "providers";
import { PATH_PAGE } from "constants/paths";
import { fDateTime } from "utils/formatTime";
import { icons } from "constants";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  totalLength: 0,
};

const UserItem = ({ item, active, onClick }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={[{ px: 3, py: 1, position: "relative" }]}
      // onClick={() => onClick(item, active && true)}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: active ? "100%" : "0%",
          height: "100%",
          bgcolor: "background.opacity",
          transition: "width 300ms ease",
        }}
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          component={Link}
          to={`/${PATH_PAGE.profile.link}/posts?email=${item?.email}`}
        >
          <Avatar src={item?.avatar?.url} sx={{ width: 40, height: 40 }} />
        </Typography>
        <Stack>
          <Typography
            variant="body2"
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=${item?.email}`}
            sx={{ color: "text.primary" }}
          >
            {item?.firstName} {item?.lastName}
          </Typography>
          <Typography
            variant="caption"
            component={Link}
            to={`/${PATH_PAGE.profile.link}/posts?email=${item?.email}`}
            sx={{ color: "text.primary" }}
          >
            {item?.email}
          </Typography>
        </Stack>
      </Stack>
      <IconButton
        onClick={() => onClick(item, active && true)}
        sx={{
          "& svg": {
            fontSize: 18,
            fill: (theme) => theme.palette.text.primary,
          },
        }}
      >
        {!active ? icons.PersonAddIcon : icons.PersonRemoveIcon}
      </IconButton>
    </Stack>
  );
};

export default function PopupAddMember(props) {
  const { onClose, open, user, roomID, handleSubmitAddMembers } = props;
  const { handleGetUsersToParticipant } = useChat();

  const [paginateSearch, setPaginateSearch] = React.useState(initialize); // search
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [addMember, setAddMember] = React.useState({ open: false, data: [] });

  const scrollRef = React.useRef();

  const handleSearchUsersCustom = React.useCallback(
    async (params) => {
      if (!paginateSearch.hasNextPage) return;
      const response = await handleGetUsersToParticipant(
        paginateSearch.page,
        roomID,
        params
      );
      return setPaginateSearch({
        page: response.next,
        hasNextPage: response.hasNextPage,
        data: [...paginateSearch.data, ...response.data],
        totalLength: response.totalLength,
      });
    },
    [open, roomID, paginateSearch]
  );

  React.useEffect(() => {
    if (!open || !roomID) return;
    // handleSearchUsersCustom();
    return () => {
      setPaginateSearch(initialize);
      setAddMember({ open: false, data: [] });
      setSearch("");
    };
  }, [open, roomID]);

  if (!roomID) {
    return <></>;
  }

  const onGetMoreMembers = async () => {
    if (
      !loading &&
      paginateSearch.hasNextPage &&
      scrollRef.current.scrollTop + scrollRef.current.clientHeight + 1 >=
        scrollRef.current.scrollHeight
    ) {
      setLoading(true);
      await handleSearchUsersCustom(search && `&search=${search}`);
      setLoading(false);
    }
  };

  const handleSubmitSearch = async () => {
    if (!search) return;
    setLoading(true);
    await handleSearchUsersCustom(`&search=${search}`);
    setLoading(false);
  };

  const handleAddMembers = (item, isRemove) => {
    if (isRemove) {
      const newAddMember = addMember.data.filter(
        (user) => user?._id !== item?._id
      );
      return setAddMember({ ...addMember, data: newAddMember });
    }
    setAddMember({ ...addMember, data: [item, ...addMember.data] });
  };

  const handleSubmitAddMemberCustom = async () => {
    setIsSubmitting(true);
    let lastMessage = "";
    const newMembers = addMember.data.map((item, index) => {
      lastMessage += `${item?.firstName} ${item?.lastName}${
        index + 1 < addMember.data.length ? ", " : ""
      }`;
      return { userID: item?._id, roomID };
    });
    lastMessage = `${user?.firstName} ${user?.lastName} đã thêm ${lastMessage} vào nhóm`;
    await handleSubmitAddMembers({ lastMessage, members: newMembers }, roomID);
    const newData = paginateSearch.data.filter(
      (item) =>
        !newMembers.map((itemMember) => itemMember.userID).includes(item?._id)
    );
    setPaginateSearch({
      ...paginateSearch,
      data: newData,
      totalLength: paginateSearch.totalLength - newData.length,
    });
    setAddMember({ open: false, data: [] });
    setIsSubmitting(false);
  };
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"mobile"}>
      {isSubmitting ? (
        <LoadingEllipsis sx={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      ) : (
        ""
      )}
      <DialogTitle>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Thêm thành viên</Typography>
          <IconButton sx={{ "& svg": { fontSize: 20 } }} onClick={onClose}>
            {icons.CloseIcon}
          </IconButton>
        </Stack>
        <TextField
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "") {
              setPaginateSearch(initialize);
            }
          }}
          sx={{
            "& input": { py: 1, fontSize: 14 },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPaginateSearch(initialize);
              handleSubmitSearch();
            }
          }}
          placeholder="Bạn muốn thêm ai?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{ "& svg": { fontSize: 20 } }}
                  onClick={handleSubmitSearch}
                >
                  {icons.SearchIcon}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          pb: 2,
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
        ref={scrollRef}
        onScroll={onGetMoreMembers}
      >
        <Box
          sx={{
            "& .infinite-scroll-component": {
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            },
          }}
        >
          <>
            <Box sx={{ px: 3 }}>
              {addMember.data.length ? (
                <Typography
                  variant="caption"
                  component="span"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() =>
                    setAddMember({ ...addMember, open: !addMember.open })
                  }
                >
                  {!addMember.open
                    ? `Đã thêm (${addMember.data.length})`
                    : "Trở về"}
                </Typography>
              ) : (
                ""
              )}

              <Divider sx={{ my: 1 }} />
            </Box>

            <Stack>
              {!addMember.open
                ? paginateSearch?.data?.map((item) => (
                    <UserItem
                      key={item._id}
                      item={item}
                      active={addMember.data.some(
                        (addItem) => addItem?._id === item?._id
                      )}
                      onClick={handleAddMembers}
                    />
                  ))
                : addMember?.data?.map((item) => (
                    <UserItem
                      key={item._id}
                      item={item}
                      active={true}
                      onClick={handleAddMembers}
                    />
                  ))}
              {loading ? (
                <Box>
                  <LoadingEllipsisElement />
                </Box>
              ) : (
                ""
              )}
            </Stack>
          </>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <MButton
          onClick={onClose}
          variant="cancel"
          // loading={isSubmitting}
          sx={{ whiteSpace: "nowrap" }}
        >
          Hủy bỏ
        </MButton>
        {addMember.data.length ? (
          <MButton
            fullWidth
            onClick={handleSubmitAddMemberCustom}
            variant="contained"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Thêm
          </MButton>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
}
