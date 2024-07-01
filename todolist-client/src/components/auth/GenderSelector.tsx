import React from "react";
import { FormControl } from "@mui/material";
import { RadioGroup } from "../common/RadioGroup";

import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER
} from "../../utils/constants";

const genderOptions = [
  { value: GENDER_MALE, label: "Male" },
  { value: GENDER_FEMALE, label: "Female" },
  { value: GENDER_OTHER, label: "Other" }
];

const GenderSelector = ({ field }: any) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup
        name="gender"
        options={genderOptions}
        label="Your Gender"
        {...field}
      />
    </FormControl>
  );
};

export default GenderSelector;
