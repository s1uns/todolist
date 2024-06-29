import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import { Container } from "@mui/material";
import { DatePickerProps } from "./types";
import { FC } from "react";

const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
  const { placeholder, onChange } = props;

  return (
    <Container sx={{ width: "50%" }}>
      <InputLabel className="form-label">{placeholder}</InputLabel>

      <ReactDatePicker
        className="input"
        dateFormat="dd.MM.yyyy"
        showPopperArrow={false}
        showMonthDropdown
        dropdownMode="select"
        onChange={(value) => {
          onChange(value!);
        }}
        todayButton="Today"
      />
    </Container>
  );
};

export default DatePicker;
