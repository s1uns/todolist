import React from "react";
import { useField, useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import { Container, TextField, Typography } from "@mui/material";
import { DatePickerProps } from "./types";
import { FC } from "react";
import styled from "@emotion/styled";

const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
  const { placeholder, field, error, touched, onChange } = props;
  const { value } = field;
  const [dateField, meta, helpers] = useField(field);
  const { setValue } = helpers;

  console.log("Field: ", field);

  return (
    <Container disableGutters={true}>
      <InputLabel className="form-label">{placeholder}</InputLabel>

      <ReactDatePicker
        dateFormat="dd.MM.yyyy"
        showPopperArrow={false}
        showMonthDropdown
        dropdownMode="select"
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          setValue(val);
        }}
        todayButton="Today"
        customInput={<TextField />}
        wrapperClassName="datePicker"
      />
      <Typography color="error">
        {error && touched ? error : "\u00A0"}
      </Typography>
    </Container>
  );
};

export default DatePicker;
