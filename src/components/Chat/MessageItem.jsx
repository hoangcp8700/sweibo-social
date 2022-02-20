import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { icons } from "constants";
import MenuDotMessageItem from "./MenuDotMessageItem";
import { fToNow } from "utils/formatTime";

const MessageItem = (props) => {
  const { children, item, active } = props;
  const dotRef = React.useRef();
  const [openDot, setOpenDot] = React.useState(false);

  const handleToggleAction = React.useCallback(
    () => setOpenDot(!openDot),
    [dotRef, openDot]
  );

  return (
    <Box sx={{ position: "relative" }}>
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
        <Stack>
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
                "& .created": { display: "block" },
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: active ? "common.white" : "text.primary" }}
            >
              {item?.text}
            </Typography>
            <Typography
              variant="caption"
              className="created"
              sx={{
                color: "common.white",
                display: "none",
              }}
            >
              {item?.updatedAt && fToNow(item?.updatedAt)}
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default MessageItem;
