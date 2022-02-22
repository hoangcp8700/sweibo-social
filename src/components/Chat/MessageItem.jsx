import React from "react";
import {
  Box,
  Avatar,
  Tooltip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { icons } from "constants";
import MenuDotMessageItem from "./MenuDotMessageItem";
import { fToNow } from "utils/formatTime";
import "components/Animation/scale-up-br.css";
import "components/Animation/slide.css";

const InfoMessage = ({ item }) => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Avatar
          src={item?.sender?.avatar?.url}
          sx={{ width: 32, height: 32 }}
        />
        <Stack>
          <Typography variant="caption">
            {item?.sender?.firstName} {item?.sender?.lastName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.white",
            }}
          >
            {item?.updatedAt && fToNow(item?.updatedAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MessageItem = (props) => {
  const { children, item, active, isGroup, isNotification } = props;
  const dotRef = React.useRef();
  const [openDot, setOpenDot] = React.useState(false);

  const handleToggleAction = React.useCallback(
    () => setOpenDot(!openDot),
    [dotRef, openDot]
  );

  return !isNotification ? (
    <Box
      className={active ? "slide-right" : "slide-left"}
      sx={{ position: "relative" }}
    >
      <MenuDotMessageItem
        anchor={dotRef}
        open={openDot}
        handleClose={handleToggleAction}
        paperStyle={{
          minWidth: 200,
        }}
      />

      <Stack
        sx={{
          maxWidth: "80%",
          width: "100%",
          flexDirection: active ? "row-reverse" : "row",
          float: active ? "right" : "inherit",
        }}
      >
        <Stack
          alignItems="center"
          sx={{ flexDirection: active ? "row-reverse" : "row", gap: 1 }}
        >
          <Tooltip
            arrow={true}
            placement="top-start"
            title={<InfoMessage item={item} />}
          >
            <Box
              sx={{
                borderRadius: 3,
                bgcolor: active ? "info.main" : "background.neutral",
                width: "fit-content",
                p: 1,
                px: 1.5,
                position: "relative",
                "&:hover": {
                  "& .dot-container": {
                    display: "block",
                  },
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: active ? "common.white" : "text.primary" }}
              >
                {item?.text}
              </Typography>

              <Box
                sx={{
                  position: "absolute",
                  right: !active && -30,
                  left: active && -30,
                  top: 0,
                  display: "none",
                }}
                className="dot-container"
              >
                <IconButton
                  sx={{ "& svg": { fontSize: 18 } }}
                  ref={dotRef}
                  onClick={() => handleToggleAction()}
                >
                  {icons.MoreVertIcon}
                </IconButton>
              </Box>
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Box>
      <Typography
        component="p"
        align="center"
        sx={{ color: "text.primary", fontWeight: 700, fontSize: 12 }}
      >
        {item?.text}
      </Typography>
    </Box>
  );
};

export default MessageItem;
