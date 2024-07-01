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
    firstField: {
      // name: "birthDate",
      // placeholder: "Your birthday date",
      // componentType: "datePicker"
    },
    secondField: {
      name: "gender",
      placeholder: "Your sex",
      type: "radio",
      componentType: "gender"
    }
  },
  {
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
    <StyledFormPaper width={30} height={80}>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userRegistrationSchema}
        onSubmit={(values) => {
          handleRegistration(values as unknown as RegistrationFormValues);
        }}
      >
        {({ errors, setTouched, isValid }) => {
          useEffect(() => {
            const touchAllFields = {
              email: true,
              firstName: true,
              lastName: true,
              city: true,
              country: true,
              heardFrom: true,
              rememberMe: true,
              password: true,
              passwordConfirmation: true
            };
            setTouched(touchAllFields);
          }, [setTouched]);

          return (
            <StyledForm>
              {topFullRows.map((field) =>
                mapToField(field, authMapper, errors)
              )}
              {halfRows.map((row) => {
                return (
                  <FormRow>
                    {mapToField(
                      row.firstField as ComponentObject,
                      authMapper,
                      errors
                    )}
                    {mapToField(
                      row.secondField as ComponentObject,
                      authMapper,
                      errors
                    )}
                  </FormRow>
                );
              })}
              {bottomFullRows.map((field) =>
                mapToField(field, authMapper, errors)
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
                <FormButton type="submit" disabled={!isValid}>
                  Registration
                </FormButton>
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
