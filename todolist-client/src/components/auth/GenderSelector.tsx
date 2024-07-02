import React from "react";
import { FormControl, FormLabel } from "@mui/material";

import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER
} from "../../utils/constants";
import { Field } from "formik";
import styled from "@emotion/styled";

const genderOptions = [
  { value: GENDER_MALE, label: "Male" },
  { value: GENDER_FEMALE, label: "Female" },
  { value: GENDER_OTHER, label: "Other" }
];

const GenderSelector = () => {
  return (
    <StyledFormControl sx={{ width: "100%" }}>
      <FormLabel>Your gender</FormLabel>
      <RadioGroup>
        {genderOptions.map(
          ({ value, label }: { value: number; label: string }) => (
            <FormLabel key={value}>
              <Field type="radio" name="gender" value={value.toString()} />
              {label}
            </FormLabel>
          )
        )}
      </RadioGroup>
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
