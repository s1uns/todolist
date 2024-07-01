import { TextField } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

const Input: FC<InputProps> = (props: InputProps) => {
  const { name, autoFocus, type, placeholder, field, form } = props;
  console.log("Props: ", props);
  console.log("Name: ", name);

  console.log("Form errors: ", form.errors);
  console.log(`${name}: `, form.errors[`${name}`]);

  return (
    <TextField
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      {...field}
      error={form?.errors?.[name] ? true : false}
      helperText={form ? (form.errors?.[name] ? form.errors?.[name] : " ") : ""}
    />
  );
};

export default Input;
