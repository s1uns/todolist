import {
  Container,
  FormLabel,
  RadioGroup as MuiRadioGroup
} from "@mui/material";
import styled from "@emotion/styled";
import RadioButton from "../RadioButton";
import { Option } from "./types";

interface RadioGroupProps {
  name: string;
  label: string;
  options: Option[];
  field: undefined | any;
}

const RadioGroupContainer = (props: RadioGroupProps) => {
  const { name, label, options, field } = props;

  return (
    <Container>
      <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
      <StyledRadioGroup aria-labelledby="radio-buttons-group-label" name={name}>
        {options.map(({ value, label }) => (
          <FormLabel>
            <RadioButton
              key={value}
              name={name}
              field={field}
              label={label}
              labelPlacement="bottom"
            />
          </FormLabel>
        ))}
      </StyledRadioGroup>
    </Container>
  );
};

export default RadioGroupContainer;

const StyledRadioGroup = styled(MuiRadioGroup)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%"
});
