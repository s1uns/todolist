import { TextField, Typography } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

const Input: FC<InputProps> = (props: InputProps) => {
  const {
    autoFocus,
    type,
    placeholder,
    fieldName,
    onChange,
    onBlur,
    error,
    touched
  } = props;
  console.log("Props: ", props);
  return (
    <>
      <TextField
        name={fieldName ? fieldName : ""}
        onChange={onChange}
        onBlur={onBlur}
        label={placeholder}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
      />
      <Typography color="error">
        {error && touched ? error : "\u00A0"}
      </Typography>
    </>
  );
};

export default Input;
