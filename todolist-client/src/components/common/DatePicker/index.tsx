import { Container, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC } from "react";

import styled from "@emotion/styled";
import {
  DateValidationError,
  LocalizationProvider,
  DatePicker as MuiDatePicker,
  PickerChangeHandlerContext
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FieldInputProps } from "formik";

interface DatePickerProps {
  label: string;
  placeholder: string;
  error: string;
  value: Dayjs;
  field?: FieldInputProps<Dayjs>;
  onChange: (
    value: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
}

const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
  const { label, placeholder, field, value, error, onChange } = props;

  const pickerValue = field
    ? dayjs(field.value)
    : value
      ? dayjs(value)
      : dayjs(new Date());

  console.log("Props: ", props);
  return (
    <Container disableGutters={true}>
      <InputLabel className="form-label">{label}</InputLabel>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          label={placeholder}
          name="birthDate"
          value={pickerValue}
          onChange={onChange}
        />
      </LocalizationProvider>
      <Typography color="error">{error ? error : "\u00A0"}</Typography>
    </Container>
  );
};

export default DatePicker;

const DatePickerContainer = styled.div`
  width: 100%;
`;
