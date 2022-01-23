import React from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { fakeData } from "constants";
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { lineClampStyle } from "utils/lineClampStyle";
import martTypography from "utils/martTypography";
import { History } from "components";
import { icons } from "constants";
import { PATH_PAGE } from "constants/paths";

const ListFriend = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const theme = useTheme();
  const isTableRes = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };
    getUsers();
  }, []);

  React.useEffect(() => {
    if (!users.length) return;
    const timer = setTimeout(async () => {
      const fitlerSearch = users.filter((user) =>
        user?.name.toLowerCase().includes(search.toLowerCase())
      );

      console.log("fitlerSearch", fitlerSearch);
      const results = fitlerSearch?.length
        ? fitlerSearch?.map((user) => ({
            ...user,
            name: martTypography(user?.name),
          }))
        : users;

      setSearchResults(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [search, users]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowProfile = (item) =>
    navigate(`/${PATH_PAGE.friend.link}/${PATH_PAGE.profile.link}/${item.id}`);

  return (
    <Box sx={{ m: "0 auto", maxWidth: (theme) => theme.breakpoints.values.lg }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 2,
        }}
        gap={1}
      >
        <Typography variant="h6" sx={{ ...lineClampStyle(1) }}>
          Danh sách bạn bè
        </Typography>
        <Typography variant="subtitle2" sx={{ whiteSpace: "nowrap" }}>
          Xem tất cả
        </Typography>
      </Stack>

      <Stack alignItems="flex-start" spacing={2}>
        <TextField
          name="search"
          value={search}
          onChange={handleChangeSearch}
          sx={{
            "& input": { py: 1, fontSize: 14 },
            "& .MuiOutlinedInput-root": {
              // borderRadius: (theme) => theme.sizes.radius,
            },
          }}
          placeholder="Người Hoàng cần tìm là ai?"
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

        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              m: "0 auto",
            }}
          >
            <History
              users={search.length ? searchResults : users}
              maxWidth={
                !isTableRes ? `calc(100vw - 413px)` : `calc(100vw - 63px)`
              }
              handleClick={(item) => handleShowProfile(item)}
              params={params?.id || null}
            />
          </Box>
        </Stack>

        <Box
          sx={{
            width: "100%",
            borderRadius: (theme) => theme.sizes.minBase,
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default ListFriend;
