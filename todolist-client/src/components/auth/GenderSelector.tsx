import React from "react";
import { FormControl, FormLabel } from "@mui/material";

import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER
} from "../../utils/constants";
import { FastField, Field, useField } from "formik";
import styled from "@emotion/styled";
import RadioButton from "../common/RadioButton";
import StyledError from "../common/Error";

const genderOptions = [
  { value: GENDER_MALE, label: "Male" },
  { value: GENDER_FEMALE, label: "Female" },
  { value: GENDER_OTHER, label: "Other" }
];

interface GenderSelectorProps {
  error: string;
  touched: boolean;
}

const GenderSelector = ({ error, touched }: GenderSelectorProps) => {
  console.log("Rerender");
  return (
    <StyledFormControl>
      <FormLabel>Your gender</FormLabel>
      <RadioGroup>
        {genderOptions.map(
          ({ value, label }: { value: number; label: string }) => {
            console.log("Val: ", value);
            return (
              <FastField
                type="radio"
                name="gender"
                value={value.toString()}
                component={RadioButton}
                label={label}
                labelPlacement="bottom"
              />
            );
          }
        )}
      </RadioGroup>
      {error && touched ? (
        <StyledError>{error}</StyledError>
      ) : (
        <StyledError>&nbsp;</StyledError>
      )}
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RadioGroup = styled.div`
  display: flex;
`;

export default GenderSelector;
