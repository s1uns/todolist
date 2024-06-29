import { Checkbox as MuiCheckbox } from "@mui/material";

interface CheckBoxProps {
  name: string;
}

const CheckBox = (props: CheckBoxProps) => {
  const { name } = props;

  return <MuiCheckbox name={name} />;
};

export default CheckBox;
