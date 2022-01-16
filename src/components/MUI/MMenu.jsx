import * as React from "react";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Box,
} from "@mui/material";

const MMenu = (props) => {
  const { open, anchor, name, handleClose, children } = props;
  const onClose = (e) => handleClose(name);

  return (
    <Box sx={{ position: "relative" }}>
      {open ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            background: "transparent",
            zIndex: 3,
          }}
        />
      ) : (
        ""
      )}
      <Popper
        open={open}
        anchorEl={anchor.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 4 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper
              elevation={5}
              sx={{
                zIndex: 4,
                mt: 1.5,
                minWidth: 300,
                bgcolor: "background.navbar",
              }}
            >
              <ClickAwayListener onClickAway={onClose}>
                <MenuList autoFocusItem={open}>
                  {children}
                  {/* <MenuItem>Logout</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
export default MMenu;
