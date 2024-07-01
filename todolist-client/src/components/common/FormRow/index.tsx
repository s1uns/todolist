import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

interface FormRowProps {
  children: React.ReactNode;
}

const FormRow = ({ children }: FormRowProps) => {
  return <StyledFormRow>{children}</StyledFormRow>;
};

export default FormRow;

const StyledFormRow = styled(Box)({
  width: "100%",
  marginTop: "0.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.7rem"
});
