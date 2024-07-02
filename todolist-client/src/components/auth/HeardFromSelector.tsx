import { ChangeEvent, useCallback } from "react";
import { FastField, Field, useField } from "formik";
import CheckBox from "../common/CheckBox";
import { Container, FormLabel, Grid } from "@mui/material";

import {
  HEARD_FROM_ADVERTISEMENT,
  HEARD_FROM_FRIEND,
  HEARD_FROM_INTERNET,
  HEARD_FROM_OTHER
} from "../../utils/constants";
import styled from "@emotion/styled";
import StyledError from "../common/Error";

const heardFromOptions = [
  { value: HEARD_FROM_FRIEND, label: "Friend" },
  { value: HEARD_FROM_INTERNET, label: "Internet" },
  { value: HEARD_FROM_ADVERTISEMENT, label: "Advertisement" },
  { value: HEARD_FROM_OTHER, label: "Other" }
];

interface HeardFromSelectorProps {
  error: string;
  touched: boolean;
}

const CheckBoxField = ({ value, label }: { value: number; label: string }) => {
  const [field, meta, helpers] = useField("heardFrom");
  const { value: inputValue } = meta;
  const { setValue } = helpers;
  const handleSelectHeardFrom = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation;

      const isExist = inputValue?.find((item: number) => item === value);
      if (isExist) {
        const newList = [...inputValue].filter(
          (item: number) => item !== value
        );
        setValue(newList);
        return;
      } else {
        const newList = [...inputValue, value];
        setValue(newList);
        return;
      }
    },
    [inputValue]
  );

  return (
    <StyledGridItem item xs={6} key={value}>
      <FastField
        name="heardFrom"
        component={CheckBox}
        onChange={handleSelectHeardFrom}
        value={value}
        label={label}
      />
    </StyledGridItem>
  );
};

const HeardFromSelector = ({ error, touched }: HeardFromSelectorProps) => {
  return (
    <StyledContainer>
      <FormLabel id="checkbox-buttons-group-label">
        How did you know about us?
      </FormLabel>
      <Grid role="group" container spacing={1}>
        {heardFromOptions.map(({ value, label }) => (
          <CheckBoxField key={value} value={value} label={label} />
        ))}
      </Grid>
      {error && touched ? (
        <StyledError>{error}</StyledError>
      ) : (
        <StyledError>&nbsp;</StyledError>
      )}
    </StyledContainer>
  );
};

export default HeardFromSelector;

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  gap: "1rem"
});

const StyledGridItem = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start"
});
