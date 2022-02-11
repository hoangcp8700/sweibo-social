import * as React from "react";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  IconButton,
  Select,
} from "@mui/material";

export default function MSelect(props) {
  const {
    lists,
    onChange,
    placeholder,
    value,
    containerStyle,
    sx,
    ...restProps
  } = props;
  return (
    <FormControl sx={containerStyle}>
      <Select
        displayEmpty
        value={value}
        defaultValue=""
        onChange={onChange}
        sx={{ fontSize: 14, ...sx }}
        {...restProps}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          {placeholder}
        </MenuItem>
        {lists?.length
          ? lists.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                sx={{ fontSize: 14 }}
              >
                {item.icon ? (
                  <IconButton
                    sx={{
                      p: 0,
                      mr: 1,
                      "& svg": {
                        fontSize: 14,
                        fill: (theme) => theme.palette.text.primary,
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ) : (
                  ""
                )}
                {item.label}
              </MenuItem>
            ))
          : ""}
      </Select>
    </FormControl>
  );
}
