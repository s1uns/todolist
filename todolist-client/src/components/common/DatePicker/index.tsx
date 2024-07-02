import React from "react";
import { useField, useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import { Container } from "@mui/material";
import { DatePickerProps } from "./types";
import { FC } from "react";

const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
  const { placeholder, field } = props;
  const { value } = field;
  const [dateField, meta, helpers] = useField(field);
  const { setValue } = helpers;

  return (
    <Container>
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
      />
    </Container>
  );
};

export default DatePicker;
