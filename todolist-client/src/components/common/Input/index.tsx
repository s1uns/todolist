import { TextField, Typography } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

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
      <Typography color="error">{error && touched ? error : "\u00A0"}</Typography>
    </>
  );  
};

export default Input;
