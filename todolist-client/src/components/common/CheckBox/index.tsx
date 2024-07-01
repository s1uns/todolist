import { Checkbox as MuiCheckbox } from "@mui/material";

interface CheckBoxProps {
  name: string;
  field: undefined | any;
}

const CheckBox = (props: CheckBoxProps) => {
  const { name, field } = props;

  return <MuiCheckbox name={name} {...field} />;
};

export default CheckBox;
