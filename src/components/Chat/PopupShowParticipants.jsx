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

const UserItem = ({ item }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        component={Link}
        to={`${PATH_PAGE.profile.link}/posts?email=${item?.userID?.email}`}
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
          to={`${PATH_PAGE.profile.link}/posts?email=${item?.userID?.email}`}
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
          {item?.createdAt && `Tham gia ngày ${fDateTime(item?.createdAt)}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default function PopupShowParticipants(props) {
  const { onClose, open, roomID } = props;
  const { handleGetParticipants } = useChat();
  const [paginate, setPaginate] = React.useState(initialize); // participants
  const [paginateSearch, setPaginateSearch] = React.useState(initialize); // search
  const [search, setSearch] = React.useState("");

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
    };
  }, [open, roomID]);

  if (!roomID) {
    return <></>;
  }

  const handleSubmitSearch = () => {
    if (!search) return;
    handleSearchParticipantsCustom(`&search=${search}`);
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
      <DialogContent>
        <Box
          sx={{
            "& .infinite-scroll-component": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
            },
          }}
        >
          {paginateSearch?.totalLength > 0 && search ? (
            <InfiniteScroll
              hasNextPage={paginateSearch?.hasNextPage}
              data={paginateSearch?.data}
              fetch={() => handleSearchParticipantsCustom(`&search=${search}`)}
            >
              {paginateSearch?.data?.map((item) => (
                <UserItem key={item._id} item={item} />
              ))}
            </InfiniteScroll>
          ) : (
            <InfiniteScroll
              hasNextPage={paginate?.hasNextPage}
              data={paginate?.data}
              fetch={handleGetParticipantsCustom}
            >
              {paginate?.data?.map((item) => (
                <UserItem key={item._id} item={item} />
              ))}
            </InfiniteScroll>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
