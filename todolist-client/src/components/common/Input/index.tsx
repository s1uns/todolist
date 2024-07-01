import { TextField } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, type, placeholder, field, form } = props;

  return (
    <TextField
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      {...field}

    />
  );
};

export default Input;
