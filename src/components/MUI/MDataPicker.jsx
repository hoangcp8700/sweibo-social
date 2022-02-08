import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import { TextField } from "@mui/material";
import { vi } from "date-fns/locale";

const MDataPicker = (props) => {
  const { value, onChange, inputProps, ...restProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        {...restProps}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...inputProps}
            {...params}
            sx={{
              width: "100%",
              "& input": { py: 1.5, px: 3, fontSize: 14 },
              "& .MuiInputLabel-root": {
                color: "#b7bbbe",
                fontSize: 14,
                pl: 1.5,
              },
            }}
          />
        )}
        PaperProps={{
          sx: {
            "& .PrivatePickersFadeTransitionGroup-root": { maxHeight: 280 },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default MDataPicker;
