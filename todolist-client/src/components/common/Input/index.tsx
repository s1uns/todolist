import { TextField } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, inputType, placeholder } = props;

  return (
    <TextField
      autoFocus={autoFocus}
      type={inputType}
      placeholder={placeholder}
    />
  );
};

export default Input;
