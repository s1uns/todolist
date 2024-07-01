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

const heardFromOptions = [
  { value: HEARD_FROM_FRIEND, label: "Friend" },
  { value: HEARD_FROM_INTERNET, label: "Internet" },
  { value: HEARD_FROM_ADVERTISEMENT, label: "Advertisement" },
  { value: HEARD_FROM_OTHER, label: "Other" }
];

const HeardFromSelector = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <FormLabel id="checkbox-buttons-group-label">
        How did you know about us?
      </FormLabel>
      <Grid role="group" container spacing={2}>
        {heardFromOptions.map(({ value, label }) => (
          <Grid item xs={6}>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HeardFromSelector;
