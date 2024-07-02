import { FC, useEffect } from "react";
import { userRegistrationSchema } from "../../utils/validators";
import { mapToField } from "../../utils/helpers";
import Input from "../common/Input";
import { Field } from "formik";
import { FormButton } from "../common/Button";
import { StyledForm, StyledFormPaper, StyledFormikForm } from "../common/Form";
import FormRow from "../common/FormRow";
import CheckBox from "../common/CheckBox";
import { FormControlLabel } from "@mui/material";
import { ComponentObject } from "../../utils/helpers/mapComponentToField";
import DatePicker from "../common/DatePicker";
import HeardFromSelector from "./HeardFromSelector";
import GenderSelector from "./GenderSelector";

const topFullRows = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    componentType: "input"
  },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    componentType: "input"
  }
] as ComponentObject[];

const halfRows = [
  {
    fieldsGap: 5,
    firstField: {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      componentType: "input"
    },
    secondField: {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      componentType: "input"
    }
  },
  {
    fieldsGap: 5,
    firstField: {
      name: "birthDate",
      type: "date",
      placeholder: "Your birthday date",
      componentType: "datePicker"
    },
    secondField: {
      name: "gender",
      placeholder: "Your sex",
      type: "radio",
      componentType: "gender"
    }
  },
  {
    fieldsGap: 5,
    firstField: {
      name: "country",
      type: "text",
      placeholder: "Country",
      componentType: "input"
    },
    secondField: {
      name: "city",
      type: "text",
      placeholder: "City",
      componentType: "input"
    }
  }
];

const bottomFullRows = [
  {
    name: "heardFrom",
    type: "checkbox",
    componentType: "heardFrom"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    componentType: "input"
  },
  {
    name: "passwordConfirmation",
    type: "password",
    placeholder: "Confirm password",
    componentType: "input"
  }
] as ComponentObject[];

const authMapper = {
  input: Input,
  gender: GenderSelector,
  datePicker: DatePicker,
  heardFrom: HeardFromSelector
};

interface RegistrationFormValues {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: number | null;
  city: string;
  country: string;
  heardFrom: number[];
  rememberMe: boolean;
  password: string;
  passwordConfirmation: string;
}

const initialValues: RegistrationFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  birthDate: new Date(),
  gender: null,
  city: "",
  country: "",
  heardFrom: [],
  rememberMe: false,
  password: "",
  passwordConfirmation: ""
};

const RegistrationForm: FC = () => {
  const handleRegistration = (values: RegistrationFormValues) => {
    const { email, password } = values;
    console.log("Registration: ", values);

    // dispatch(
    //     RegistrationUserRequest({
    //         email: email,
    //         password: password,
    //     })
    // );
  };

  return (
    <StyledFormPaper width={30} height={90}>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userRegistrationSchema}
        onSubmit={(values) => {
          handleRegistration(values as unknown as RegistrationFormValues);
        }}
      >
        {({ errors, touched, values }) => {
          return (
            <StyledForm>
              {topFullRows.map((field) =>
                mapToField(field, authMapper, errors, touched)
              )}
              {halfRows.map((row) => {
                return (
                  <FormRow key={row.firstField.name} fieldsGap={row.fieldsGap}>
                    {mapToField(
                      row.firstField as ComponentObject,
                      authMapper,
                      errors,
                      touched
                    )}
                    {mapToField(
                      row.secondField as ComponentObject,
                      authMapper,
                      errors,
                      touched
                    )}
                  </FormRow>
                );
              })}
              {bottomFullRows.map((field) =>
                mapToField(field, authMapper, errors, touched)
              )}

              <FormRow fieldsGap={12}>
                <FormControlLabel
                  control={
                    <Field
                      name="rememberMe"
                      type="checkbox"
                      component={CheckBox}
                    />
                  }
                  label="Remember me"
                ></FormControlLabel>
                <FormButton type="submit">Registration</FormButton>
              </FormRow>
              <a href="/login">Already have an account? Log in!</a>
            </StyledForm>
          );
        }}
      </StyledFormikForm>
    </StyledFormPaper>
  );
};

export default RegistrationForm;
