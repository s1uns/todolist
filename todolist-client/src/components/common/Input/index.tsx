import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";
import { FieldInputProps } from "formik";
import { FC, FocusEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
  autoFocus?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  field?: FieldInputProps<string>;
  error?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, type, placeholder, field, onChange, onBlur, error } =
    props;

  const name = field ? field.name : "";
  return (
    <InputContainer>
      <TextField
        name={name}
        onChange={onChange ? onChange : field ? field.onChange : () => {}}
        onBlur={field ? field.onBlur : onBlur}
        label={placeholder}
        autoFocus={autoFocus}
        type={type ? type : "text"}
        placeholder={placeholder}
      />
      <Typography color="error">{error ? error : "\u00A0"}</Typography>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.01rem;
`;
