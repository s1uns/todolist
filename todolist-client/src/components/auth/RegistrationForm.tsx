import styled from "@emotion/styled";
import { FormControlLabel, Paper } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { userRegistrationSchema } from "../../utils/validators";
import { FormButton } from "../common/Button";
import CheckBox from "../common/CheckBox";
import FormRow from "../common/FormRow";
import Input from "../common/Input";
import GenderSelector from "./GenderSelector";
import HeardFromSelector from "./HeardFromSelector";

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
        {({ errors, touched, values, handleChange, handleBlur }) => {
          console.log("Values: ", values);
          return (
            <StyledForm>
              <Field
                validateOnBlur
                validateOnChange
                name="email"
                component={Input}
                type="text"
                placeholder="Email"
              />
              <Field
                validateOnBlur
                validateOnChange
                name="username"
                component={Input}
                type="text"
                placeholder="Username"
              />
              <FormRow fieldsGap={5}>
                <Field
                  validateOnBlur
                  validateOnChange
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First name"
                />
                <Field
                  validateOnBlur
                  validateOnChange
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last name"
                />
              </FormRow>
              <FormRow fieldsGap={10}>
                <Field
                  validateOnBlur
                  validateOnChange
                  name="birthDate"
                  component={DatePicker}
                  type="date"
                  placeholder="Your birthdate"
                />
                <Field
                  validateOnBlur
                  validateOnChange
                  name="lastName"
                  component={GenderSelector}
                  type="radio"
                  placeholder="Your gender"
                />
              </FormRow>
              <FormRow fieldsGap={5}>
                <Field
                  validateOnBlur
                  validateOnChange
                  name="country"
                  component={Input}
                  type="text"
                  placeholder="Country"
                />
                <Field
                  validateOnBlur
                  validateOnChange
                  name="city"
                  component={Input}
                  type="text"
                  placeholder="City"
                />
              </FormRow>

              <HeardFromSelector
                error={errors?.heardFrom as string}
                touched={touched?.heardFrom as boolean}
              />
              <Field
                validateOnBlur
                validateOnChange
                name="password"
                component={Input}
                type="password"
                placeholder="Password"
              />
              <Field
                validateOnBlur
                validateOnChangename="passwordConfirmation"
                component={Input}
                type="password"
                placeholder="Confirm your password"
              />
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
              <a href="/login">Already have an account? Log in!</a>
            </StyledForm>
          );
        }}
      </StyledFormikForm>
    </StyledFormPaper>
  );
};

export default RegistrationForm;

const StyledForm = styled(Form)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFormikForm = styled(Formik)`
  width: 100%;
  height: 100%;
  margin: 5rem;
  display: flex;
  justify-content: center;
`;

const StyledFormPaper = styled(Paper)(
  ({ width, height }: { width: number; height: number }) => ({
    width: `${width}%`,
    height: `${height}%`
  })
);
