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
  const { value, checked = false } = props;

  let checkPropp = checked;
  const radioGroup = useRadioGroup();
  if (radioGroup) {
    checkPropp = radioGroup.value === value;
  }

  return <StyledFormControlLabel checked={checkPropp} {...props} />;
}

export default function UseRadioGroup(props) {
  const {
    radioGroupProps,
    labelStyle,
    label,
    radioProps,
    lists,
    ...restProps
  } = props;
  return (
    <FormControl variant="standard">
      {label ? (
        <FormLabel
          sx={{
            color: "text.primary",
            fontSize: 14,
            fontWeight: 700,
            ...labelStyle,
          }}
        >
          {label}
        </FormLabel>
      ) : (
        ""
      )}
      <RadioGroup {...radioGroupProps} {...restProps}>
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
