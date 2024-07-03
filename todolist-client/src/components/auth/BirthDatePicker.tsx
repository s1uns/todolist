import styled from "@emotion/styled";
import {
  DateValidationError,
  PickerChangeHandlerContext
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FastField, useField } from "formik";
import { useCallback } from "react";
import DatePicker from "../common/DatePicker";

interface BirthDatePickerProps {
  error: string;
}

const BirthDatePicker = ({ error }: BirthDatePickerProps) => {
  const [field, meta, helpers] = useField("birthDate");
  const { value: inputValue } = meta;
  const { setValue } = helpers;

  const handleSelectBirthDate = useCallback(
    (
      value: Dayjs | null,
      context: PickerChangeHandlerContext<DateValidationError>
    ) => {
      setValue(dayjs(value).format());
    },
    [inputValue]
  );

  return (
    <StyledFieldContainer>
      <FastField
        label="Your birthday date"
        error={error}
        value={inputValue}
        onChange={handleSelectBirthDate}
        component={DatePicker}
      />
    </StyledFieldContainer>
  );
};

export default BirthDatePicker;

const StyledFieldContainer = styled.div`
  width: 45%;
`;
