import styled from "@emotion/styled";
import { Checkbox as MuiCheckbox, Typography } from "@mui/material";
import { FieldInputProps } from "formik";
import { ChangeEvent } from "react";

interface CheckBoxProps {
  label?: string;
  field?: FieldInputProps<string | number | boolean>;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { label, field, onChange } = props;

  const name = field ? field.name : "";

  return (
    <CheckBoxWrapper>
      <MuiCheckbox name={name} onChange={onChange} />
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
