import { FormControlLabel, Radio } from "@mui/material";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  name: string;
  label: string;
  labelPlacement: string;
  field: undefined | any;
  // onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const { name, label, labelPlacement, field } = props;

  return (
    <FormControlLabel
      control={<Radio />}
      label={label}
      labelPlacement={labelPlacement}
      name={name}
      {...field}
    />
  );
};

export default RadioButton;
