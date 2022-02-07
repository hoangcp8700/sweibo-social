import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField } from "@mui/material";
import { vi } from "date-fns/locale";

const MDataPicker = React.forwardRef((props, ref) => {
  const {
    value,
    onChange,
    isTimer,
    isDateRange,
    isDateAndTime,
    inputProps,
    ...restProps
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi} ref={ref}>
      {isTimer ? (
        <DesktopTimePicker
          {...restProps}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          renderInput={(params) => <TextField {...inputProps} />}
        />
      ) : isDateAndTime ? (
        <DateTimePicker
          {...restProps}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          renderInput={(params) => <TextField {...inputProps} />}
        />
      ) : (
        <DatePicker
          inputFormat="dd/MM/yyyy"
          {...restProps}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          renderInput={(params) => <TextField {...inputProps} />}
        />
      )}
    </LocalizationProvider>
  );
});

export default MDataPicker;
