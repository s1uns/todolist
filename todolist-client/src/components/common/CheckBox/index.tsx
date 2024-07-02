import { Checkbox as MuiCheckbox } from "@mui/material";
import { useState } from "react";

interface CheckBoxProps {
  checkBoxName: string;
  field: undefined | any;
}

const CheckBox = (props: CheckBoxProps) => {
  const { checkBoxName, field } = props;

  return <MuiCheckbox name={checkBoxName} {...field} />;
};

export default CheckBox;
