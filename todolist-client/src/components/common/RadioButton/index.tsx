import { FormControlLabel, Radio } from "@mui/material";
import { SyntheticEvent } from "react";

interface RadioButtonProps {
  name: string;
  label: string;
  labelPlacement: "end" | "start" | "top" | "bottom" | undefined;
  isChecked: boolean;
  
  onChange: (e: SyntheticEvent<Element, Event>) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const { name, label, labelPlacement, isChecked, onChange } = props;

  return (
    <FormControlLabel
      control={<Radio />}
      label={label}
      labelPlacement={labelPlacement}
      onChange={onChange}
      name={name}
      checked={isChecked}
    />
  );
};

export default RadioButton;
