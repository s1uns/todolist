import React from "react";
import { Field } from "formik";
import CheckBox from "../common/CheckBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, FormLabel, Grid } from "@mui/material";

import {
  HEARD_FROM_ADVERTISEMENT,
  HEARD_FROM_FRIEND,
  HEARD_FROM_INTERNET,
  HEARD_FROM_OTHER
} from "../../utils/constants";
import styled from "@emotion/styled";

const heardFromOptions = [
  { value: HEARD_FROM_FRIEND, label: "Friend" },
  { value: HEARD_FROM_INTERNET, label: "Internet" },
  { value: HEARD_FROM_ADVERTISEMENT, label: "Advertisement" },
  { value: HEARD_FROM_OTHER, label: "Other" }
];

const HeardFromSelector = () => {
  return (
    <StyledContainer>
      <FormLabel id="checkbox-buttons-group-label">
        How did you know about us?
      </FormLabel>
      <Grid role="group" container spacing={1}>
        {heardFromOptions.map(({ value, label }) => (
          <StyledGridItem item xs={6} key={value}>
            <FormControlLabel
              control={
                <Field
                  name="heardFrom"
                  type="checkbox"
                  component={CheckBox}
                  checked={true}
                  value={value.toString()}
                />
              }
              label={label}
            ></FormControlLabel>
          </StyledGridItem>
        ))}
      </Grid>
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
