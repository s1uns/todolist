import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import { FieldInputProps } from "formik";
import { FC, FocusEventHandler, HTMLInputTypeAttribute, useState } from "react";

interface InputProps {
  autoFocus?: boolean;
  value?: string;
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
  const {
    autoFocus,
    type,
    placeholder,
    field,
    value,
    onChange,
    onBlur,
    error
  } = props;

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const inputValue = field ? field.value : value;
  const name = field ? field.name : "";

  const handleChangeVisibility = () => {
    setPasswordVisibility((prevVisibility) => !passwordVisibility);
  };

  const getInputType = () => {
    if (type === "password" && !passwordVisibility) {
      return "password";
    } else if (type === "password" && passwordVisibility) {
      return "text";
    } else if (type) {
      return type;
    }
    return "text";
  };

  const getPasswordVisibility = () => {
    if (type === "password" && passwordVisibility) {
      return <VisibilityOff onClick={handleChangeVisibility} />;
    } else if (type === "password" && !passwordVisibility) {
      return <Visibility onClick={handleChangeVisibility} />;
    }
    return null;
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (onChange) {
      onChange(e);
    } else if (field) {
      field.onChange(e);
    }
  };

  return (
    <InputContainer>
      <TextField
        name={name}
        onChange={handleChangeValue}
        onBlur={field ? field.onBlur : onBlur}
        label={placeholder}
        autoFocus={autoFocus}
        type={getInputType()}
        value={inputValue}
        placeholder={placeholder}
      />
      <Typography color="error">{error ? error : "\u00A0"}</Typography>
      {<VisibilityContainer>{getPasswordVisibility()}</VisibilityContainer>}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.01rem;
`;

const VisibilityContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-90%);
  &:hover {
    cursor: pointer;
  }
`;
