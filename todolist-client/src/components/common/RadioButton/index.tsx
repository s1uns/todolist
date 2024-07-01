import { Radio } from "@mui/material";
import { ChangeEvent } from "react";

interface RadioButtonProps {
  name: string;
  field: undefined | any;
  // onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const { name, field } = props;
  return <Radio name={name} {...field} />;
};

export default RadioButton;
