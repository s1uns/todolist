import { FormControl, FormLabel, Typography } from "@mui/material";

import styled from "@emotion/styled";
import { FastField, useField } from "formik";
import { ChangeEvent, useCallback } from "react";
import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER
} from "../../utils/constants";
import RadioButton from "../common/RadioButton";

const genderOptions = [
  { value: GENDER_MALE, label: "Male" },
  { value: GENDER_FEMALE, label: "Female" },
  { value: GENDER_OTHER, label: "Other" }
];

interface GenderSelectorProps {
  error: string;
}

const RadioButtonField = ({
  value,
  label
}: {
  value: number;
  label: string;
}) => {
  const [field, meta, helpers] = useField("gender");
  const { value: inputValue } = meta;
  const { setValue } = helpers;
  const handleSelectGender = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation;
      setValue(value);
    },
    [inputValue]
  );

  return (
    <FastField
      type="number"
      name="gender"
      component={RadioButton}
      onChange={handleSelectGender}
      value={value}
      label={label}
      labelPlacement="bottom"
      isChecked={inputValue === value}
    />
  );
};

const GenderSelector = ({ error }: GenderSelectorProps) => {
  return (
    <StyledFormControl>
      <FormLabel>Your gender</FormLabel>
      <RadioGroup>
        {genderOptions.map(
          ({ value, label }: { value: number; label: string }) => {
            return <RadioButtonField value={value} label={label} />;
          }
        )}
      </RadioGroup>
      <Typography color="error">{error ? error : "\u00A0"}</Typography>
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
