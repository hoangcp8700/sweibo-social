import React from "react";
import {
  Stack,
  Box,
  Avatar,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import { MMenu } from "components/MUI";
import { data } from "constants";

const MenuFriend = (props) => {
  return (
    <MMenu {...props}>
      {data.menuFriendItem.map((item) => (
        <MenuItem sx={{ gap: 1, height: 40 }}>
          <IconButton
            sx={{
              "& svg": {
                fill: (theme) => theme.palette.text.primary,
                fontSize: 18,
              },
            }}
          >
            {item.icon}{" "}
          </IconButton>
          <Typography variant="subtitle2">{item.label} </Typography>
        </MenuItem>
      ))}
    </MMenu>
  );
};

const FriendItem = (props) => {
  const { item } = props;
  const { name, mutualFriends } = item;

  const [openMenu, setOpenMenu] = React.useState(false);
  const menuRef = React.useRef();

  const handleToggleMenu = () => setOpenMenu(!openMenu);

  return (
    <Box>
      <MenuFriend
        anchor={menuRef}
        open={openMenu}
        handleClose={handleToggleMenu}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              borderRadius: (theme) => theme.sizes.minBase,
              width: 80,
              height: 80,
            }}
          />
          <Stack>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {mutualFriends} bạn chung
            </Typography>
          </Stack>
        </Stack>
        <IconButton ref={menuRef} onClick={handleToggleMenu}>
          {icons.MoreHorizIcon}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default FriendItem;
