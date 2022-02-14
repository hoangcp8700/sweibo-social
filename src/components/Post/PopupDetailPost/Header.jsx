import React from "react";
import { Stack, Avatar, IconButton, Typography } from "@mui/material";
import { fToNow } from "utils/formatTime";
import { icons } from "constants";

const Header = React.forwardRef((props, ref) => {
  const { handleToggleOpenMenu, post } = props;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          src={post?.createdBy?.avatar?.url}
        />
        <Stack>
          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            {post?.createdBy?.firstName} {post?.createdBy?.lastName}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" sx={{ color: "text.primary" }}>
              {post?.createdAt && fToNow(post?.createdAt)}
            </Typography>
            <IconButton
              sx={{
                p: 0,
                "& svg": {
                  fontSize: 14,
                  fill: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {/* {post?.status === "Public"
              ? icons.PublicIcon
              : icons.LockOpenIcon} */}
              {icons.PublicIcon}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <IconButton ref={ref} onClick={handleToggleOpenMenu}>
        {icons.MoreHorizIcon}
      </IconButton>
    </Stack>
  );
});

export default Header;
