import * as React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import { useChat, useUser } from "hooks";
import { PATH_PAGE } from "constants/paths";
import { fDateTime } from "utils/formatTime";
import { icons } from "constants";
import { MButton } from "components/MUI";

const initialize = {
  page: 1,
  hasNextPage: true,
  data: [],
  totalLength: 0,
};

const MButtonStyle = styled(MButton)(({ theme }) => ({
  padding: theme.spacing(0.3, 1),
  fontSize: 12,
}));

const UserItem = ({ item, active, onClick, onSubmit }) => {
  const [form, setForm] = React.useState({ nickName: "" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!active || !item) return;
    setForm({
      ...form,
      nickName:
        item?.nickName ||
        `${item?.userID?.firstName} ${item?.userID?.lastName}`,
    });
  }, [active]);

  const onSubmitCustom = React.useCallback(async () => {
    setIsSubmitting(true);
    await onSubmit(form);
    setIsSubmitting(false);
  }, [form]);

  const handleChangeForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={[{ px: 3, py: 1, position: "relative" }]}
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
      {!active ? (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              component={Link}
              to={`/${PATH_PAGE.profile.link}/posts?email=${item?.userID?.email}`}
            >
              <Avatar
                src={item?.userID?.avatar?.url}
                sx={{ width: 40, height: 40 }}
              />
            </Typography>

            <Stack>
              <Typography
                variant="body2"
                component={Link}
                to={`/${PATH_PAGE.profile.link}/posts?email=${item?.userID?.email}`}
                sx={{ color: "text.primary" }}
              >
                {item.nickName ||
                  `${item?.userID?.firstName} ${item?.userID?.lastName}`}
              </Typography>
              {item?.nickName ? (
                <Typography
                  variant="caption"
                  sx={{ fontSize: 10, color: "text.secondary" }}
                >
                  ({item?.userID?.firstName} {item?.userID?.lastName})
                </Typography>
              ) : (
                ""
              )}
              <Typography variant="caption">
                {item?.createdAt &&
                  `Tham gia ngày ${fDateTime(item?.createdAt)}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack>
            <IconButton
              onClick={() => onClick(item)}
              sx={{
                "& svg": {
                  fontSize: 18,
                  fill: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {icons.EditIcon}
            </IconButton>
          </Stack>
        </>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Avatar
            src={item?.userID?.avatar?.url}
            sx={{ width: 40, height: 40 }}
          />

          <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                name="nickName"
                value={form?.nickName}
                onChange={handleChangeForm}
                placeholder="Nickname"
                fullWidth
                sx={{
                  "& input": { py: 0.5, fontSize: 12 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <MButtonStyle
                variant="contained"
                onClick={onSubmitCustom}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Sửa
              </MButtonStyle>
              <MButtonStyle
                variant="cancel"
                onClick={() => onClick(null)}
                disabled={isSubmitting}
              >
                Hủy bỏ
              </MButtonStyle>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default function PopupShowParticipants(props) {
  const { onClose, open, roomID, user, socket } = props;
  const { handleGetParticipants, handleEditMember } = useChat();
  const [paginate, setPaginate] = React.useState(initialize); // participants
  const [paginateSearch, setPaginateSearch] = React.useState(initialize); // search
  const [search, setSearch] = React.useState("");
  const [memberEdit, setMemberEdit] = React.useState(null);

  const handleGetParticipantsCustom = React.useCallback(async () => {
    if (!paginate.hasNextPage) return;
    const response = await handleGetParticipants(paginate.page, roomID);

    setPaginate({
      page: response.next,
      hasNextPage: response.hasNextPage,
      data: [...paginate.data, ...response.data],
      totalLength: response.totalLength,
    });
  }, [open, roomID, paginate, search]);

  const handleSearchParticipantsCustom = React.useCallback(
    async (params) => {
      if (!paginateSearch.hasNextPage) return;
      const response = await handleGetParticipants(
        paginateSearch.page,
        roomID,
        params
      );

      setPaginateSearch({
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
    handleGetParticipantsCustom();
    return () => {
      setPaginate(initialize);
      setPaginateSearch(initialize);
      setSearch("");
      setMemberEdit(null);
    };
  }, [open, roomID]);

  if (!roomID) {
    return <></>;
  }

  const handleSubmitSearch = () => {
    if (!search) return;
    handleSearchParticipantsCustom(`&search=${search}`);
  };

  const handleToggleIsEditMember = (user = null) => {
    setMemberEdit(user);
  };

  const handSubmitMemberCustom = async (form) => {
    console.log(" user?._id === memberEdit?._id ", user?._id, memberEdit);
    const newForm = {
      ...form,
      lastMessage:
        user?._id === memberEdit?.userID?._id
          ? `${user?.firstName} ${user?.lastName} đã tự đặt biệt danh là ${form.nickName}`
          : `${user?.firstName} ${user?.lastName} đã đặt biệt danh cho ${memberEdit?.userID?.firstName} ${memberEdit?.userID?.lastName} là ${form.nickName}`,
    };
    const response = await handleEditMember(newForm, roomID, memberEdit?._id);
    console.log("handSubmitMemberCustom", response);
    if (response) {
      const newData = paginate.data.map((item) => {
        if (item?._id !== memberEdit?._id) return item;
        return { ...item, nickName: response.participant.nickName };
      });

      setPaginate({
        ...paginate,
        data: newData,
      });

      socket.current.emit("updateRoom", {
        room: response.room,
      });
      socket.current.emit("sendMessage", {
        roomID,
        message: response.dataMessage,
      });

      setMemberEdit(null);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"mobile"}>
      <DialogTitle>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            Danh sách thành viên{" "}
            {paginate?.totalLength ? `(${paginate?.totalLength})` : ""}
          </Typography>
          <IconButton sx={{ "& svg": { fontSize: 20 } }} onClick={onClose}>
            {icons.CloseIcon}
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === "" && paginateSearch.totalLength > 0)
              setPaginateSearch(initialize);
          }}
          sx={{
            "& input": { py: 1, fontSize: 14 },
            "& .MuiOutlinedInput-root": {
              borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitSearch()}
          placeholder="Bạn muốn tìm ai?"
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
      >
        <Stack spacing={1}>
          {paginateSearch?.totalLength > 0 && search
            ? paginateSearch?.data?.map((item) => (
                <UserItem
                  key={item._id}
                  item={item}
                  active={item?._id === memberEdit?._id}
                  onClick={handleToggleIsEditMember}
                  onSubmit={handSubmitMemberCustom}
                  user={user}
                />
              ))
            : paginate?.data?.map((item) => (
                <UserItem
                  key={item._id}
                  item={item}
                  active={item?._id === memberEdit?._id}
                  onClick={handleToggleIsEditMember}
                  onSubmit={handSubmitMemberCustom}
                  user={user}
                />
              ))}

          {paginate.hasNextPage || (paginateSearch?.hasNextPage && search) ? (
            <Box>
              <Typography
                variant="subtitle2"
                align="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() =>
                  paginateSearch?.totalLength > 0 && search
                    ? handleSubmitSearch()
                    : handleGetParticipantsCustom()
                }
              >
                Xem thêm
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
