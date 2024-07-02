import { TextField } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";
import StyledError from "../Error";

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, type, placeholder, field, error, touched } = props;
  return (
    <>
      <TextField
        label={placeholder}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        {...field}
      />
      {error && touched ? (
        <StyledError>{error}</StyledError>
      ) : (
        <StyledError>&nbsp;</StyledError>
      )}
    </>
  );
};

export default Input;
