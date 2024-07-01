import { Radio } from "@mui/material";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  return <Radio {...props} />;
};

export default RadioButton;
