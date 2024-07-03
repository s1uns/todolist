import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";
import { FC } from "react";

interface InputProps {
  componentName: "string";
  autoFocus: boolean;
  type: string;
  placeholder: string;
  fieldName?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  error: undefined | string;
}

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, type, placeholder, fieldName, onChange, onBlur, error } =
    props;

  const name = fieldName ? fieldName : "";

  return (
    <InputContainer>
      <TextField
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        label={placeholder}
        autoFocus={autoFocus}
        type={type}
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
