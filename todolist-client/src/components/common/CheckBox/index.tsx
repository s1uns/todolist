import styled from "@emotion/styled";
import { Checkbox as MuiCheckbox, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface CheckBoxProps {
  checkBoxName: string;
  field: undefined | any;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { checkBoxName, field, label, onChange } = props;

  return (
    <CheckBoxWrapper>
      <MuiCheckbox name={checkBoxName} {...field} onChange={onChange} />;
      {label ? <CheckBoxLabelTitle>{label}</CheckBoxLabelTitle> : <div></div>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckBoxLabelTitle = styled(Typography)`
  font-size: 1rem;
`;
