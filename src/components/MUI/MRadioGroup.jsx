import * as React from "react";
import { useRadioGroup } from "@mui/material/RadioGroup";
import {
  FormControlLabel,
  styled,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
} from "@mui/material";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
  "& .MuiTypography-root": {
    fontSize: 14,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function UseRadioGroup(props) {
  const { radioGroupProps, label, radioProps, lists } = props;
  return (
    <FormControl variant="standard">
      {label ? (
        <FormLabel
          sx={{ color: "common.black", fontSize: 14, fontWeight: 700 }}
        >
          {label}
        </FormLabel>
      ) : (
        ""
      )}
      <RadioGroup {...radioGroupProps}>
        {lists.map((item) => (
          <MyFormControlLabel
            value={item.value}
            label={item.label}
            key={item.value}
            control={<Radio {...radioProps} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
