import React from "react";
import { fakeData } from "constants";
import { Paper, Box, Avatar, Button, Stack, Typography } from "@mui/material";
import { lineClampStyle } from "utils/lineClampStyle";

const CardUser = ({ item }) => {
  return (
    <Paper
      sx={[
        {
          flex: 1,
          minWidth: 175,
          overflow: "hidden",
          bgcolor: "background.navbar",
        },
        (theme) => ({
          [theme.breakpoints.down("sm")]: {
            minWidth: 140,
            maxWidth: "inherit",
          },
          [theme.breakpoints.down("375")]: { minWidth: 120 },
        }),
      ]}
    >
      <Stack alignItems="center">
        <Box
          sx={{
            width: "100%",
            p: 1,
          }}
        >
          <Avatar
            imgProps={{
              loading: "lazy",
            }}
            src={item?.avatar}
            alt={item?.name}
            sx={[
              (theme) => ({
                borderRadius: (theme) => theme.sizes.minBase,
                width: "100%",
                height: 150,
                [theme.breakpoints.down("sm")]: {
                  height: 120,
                },
              }),
            ]}
          />
          <Box sx={{ height: 48, p: 1 }}>
            <Typography sx={{ ...lineClampStyle(2) }}>{item?.name} </Typography>
          </Box>
        </Box>

        <Stack spacing={1} sx={{ width: "100%", p: 1 }}>
          <Button
            sx={{
              textTransform: "capitalize",
              bgcolor: "primary.main",
              color: "common.white",
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            Xác nhận
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
              bgcolor: "background.opacity",
              color: "text.primary",
              "&:hover": {
                bgcolor: "background.navbar",
              },
            }}
          >
            Hủy bỏ
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

const SuggestFriend = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const reponse = await fakeData.GET_USERS();
      setUsers(reponse);
    };
    getUsers();
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
        gap={1}
      >
        <Typography variant="h6" sx={{ ...lineClampStyle(1) }}>
          Lời mời kết bạn
        </Typography>
        <Typography variant="subtitle2" sx={{ whiteSpace: "nowrap" }}>
          Xem tất cả
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={[
          { flexWrap: "wrap", gap: 2, justifyContent: "space-between" },
          (theme) => ({
            [theme.breakpoints.down("sm")]: { justifyContent: "center" },
          }),
        ]}
      >
        {users?.map((item) => (
          <CardUser key={item.id} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default SuggestFriend;
