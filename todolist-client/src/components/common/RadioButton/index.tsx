import { FormControlLabel, Radio } from "@mui/material";

interface RadioButtonProps {
  name: string;
  label: string;
  labelPlacement: "end" | "start" | "top" | "bottom" | undefined;
  field: undefined | any;
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
