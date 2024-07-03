import { TextField, Typography } from "@mui/material";
import { InputProps } from "./types";
import { FC } from "react";

const Input: FC<InputProps> = (props: InputProps) => {
  const { autoFocus, type, placeholder, fieldName, onChange, error, touched } =
    props;
  console.log("Props: ", props);
  return (
    <>
      <TextField
        name={fieldName ? fieldName : ""}
        onChange={onChange}
        label={placeholder}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        // {...field}
      />
      <Typography color="error">
        {error && touched ? error : "\u00A0"}
      </Typography>
    </>
  );
};

export default Input;
