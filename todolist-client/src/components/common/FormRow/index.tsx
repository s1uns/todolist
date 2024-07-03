import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

interface FormRowProps {
  children: React.ReactNode;
  fieldsGap?: number;
}

const FormRow = ({ children, fieldsGap }: FormRowProps) => {
  return <StyledFormRow gap={fieldsGap}>{children}</StyledFormRow>;
};

export default FormRow;

const StyledFormRow = styled(Box)(({ gap }) => ({
  width: "100%",
  marginTop: "0.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: gap ? `${gap}rem` : "5rem" 
}));
