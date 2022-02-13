import * as React from "react";
import {
  ClickAwayListener,
  IconButton,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";

const PopupMenu = React.forwardRef((props, ref) => {
  const { open, onClose, onClick, lists } = props;

  return (
    <Popper
      open={open}
      anchorEl={ref.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
      style={{ zIndex: 2 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList autoFocusItem={open}>
                {lists?.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => onClick(item.value)}
                    sx={{ fontSize: 14, gap: 0.5, py: 0 }}
                  >
                    {item.icon ? (
                      <IconButton sx={{ "& svg": { fontSize: 16 } }}>
                        {item.icon}
                      </IconButton>
                    ) : (
                      ""
                    )}{" "}
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
});

export default PopupMenu;
