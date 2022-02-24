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
} from "@mui/material";
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
      onClick={() => onClick(item, active && true)}
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
  const { onClose, open, roomID } = props;
  const { handleGetUsersToParticipant } = useChat();
  const [paginateSearch, setPaginateSearch] = React.useState(initialize); // search
  const [search, setSearch] = React.useState("");
  const [addMember, setAddMember] = React.useState({ open: false, data: [] });

  const handleSearchUsersCustom = React.useCallback(
    async (params) => {
      if (!paginateSearch.hasNextPage) return;
      const response = await handleGetUsersToParticipant(
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
    handleSearchUsersCustom();
    return () => {
      setPaginateSearch(initialize);
      setAddMember({ open: false, data: [] });
      setSearch("");
    };
  }, [open, roomID]);

  if (!roomID) {
    return <></>;
  }

  const handleSubmitSearch = () => {
    if (!search) return;
    handleSearchUsersCustom(`&search=${search}`);
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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"mobile"}>
      <DialogTitle>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Thêm thành viên</Typography>
          <IconButton sx={{ "& svg": { fontSize: 20 } }}>
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
      <DialogContent sx={{ p: 0, pb: 2 }}>
        <Box
          sx={{
            "& .infinite-scroll-component": {
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            },
          }}
        >
          {paginateSearch?.totalLength ? (
            <>
              <Box sx={{ px: 3 }}>
                <Typography variant="subtitle2" component="span">
                  Gợi ý{" "}
                </Typography>
                {addMember.data.length ? (
                  <>
                    <span>- </span>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{ "&:hover": { textDecoration: "underline" } }}
                      onClick={() =>
                        setAddMember({ ...addMember, open: !addMember.open })
                      }
                    >
                      Đã thêm ({addMember.data.length})
                    </Typography>
                  </>
                ) : (
                  ""
                )}

                <Divider sx={{ my: 1 }} />
              </Box>
              {!addMember.open ? (
                <InfiniteScroll
                  hasNextPage={paginateSearch?.hasNextPage}
                  data={paginateSearch?.data}
                  fetch={() => handleSearchUsersCustom(`&search=${search}`)}
                >
                  {paginateSearch?.data?.map((item) => (
                    <UserItem
                      key={item._id}
                      item={item}
                      active={addMember.data.some(
                        (addItem) => addItem?._id === item?._id
                      )}
                      onClick={handleAddMembers}
                    />
                  ))}
                </InfiniteScroll>
              ) : (
                <Stack>
                  {addMember?.data?.map((item) => (
                    <UserItem
                      key={item._id}
                      item={item}
                      active={true}
                      onClick={handleAddMembers}
                    />
                  ))}
                </Stack>
              )}
            </>
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
