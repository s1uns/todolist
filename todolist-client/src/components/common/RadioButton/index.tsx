import { FormControlLabel, Radio } from "@mui/material";
import { FieldInputProps } from "formik";

interface RadioButtonProps {
  name: string;
  label: string;
  labelPlacement: "end" | "start" | "top" | "bottom" | undefined;
  field?: FieldInputProps<number>;
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
