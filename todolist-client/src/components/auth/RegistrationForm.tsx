import styled from "@emotion/styled";
import { Button, FormControlLabel, Paper } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FastField, Form, Formik } from "formik";
import { FC } from "react";
import { userRegistrationSchema } from "../../utils/validators";
import CheckBox from "../common/CheckBox";
import DatePicker from "../common/DatePicker";
import FormRow from "../common/FormRow";
import Input from "../common/Input";
import GenderSelector from "./GenderSelector";
import HeardFromSelector from "./HeardFromSelector";

interface RegistrationFormValues {
  email: string;
  username: string;
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
  username: "",
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
    <StyledFormPaper>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userRegistrationSchema}
        onSubmit={(values) => {
          handleRegistration(values as unknown as RegistrationFormValues);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue
        }) => {
          console.log("Values: ", values);
          const handleBirthDate = (value: Dayjs) => {
            setFieldValue("birthDate", dayjs(value).format());
          };
          return (
            <StyledForm>
              <FastField
                validateOnBlur
                validateOnChange
                name="email"
                fieldName="email"
                type="text"
                placeholder="Email"
                component={Input}
                error={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="username"
                fieldName="username"
                type="text"
                placeholder="Username"
                component={Input}
                error={touched.username && errors.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="firstName"
                  fieldName="firstName"
                  type="text"
                  placeholder="First Name"
                  component={Input}
                  error={touched.firstName && errors.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="lastName"
                  fieldName="lastName"
                  type="text"
                  placeholder="Last Name"
                  component={Input}
                  error={touched.lastName && errors.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormRow>
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="birthDate"
                  component={DatePicker}
                  onChange={handleBirthDate}
                  error={touched.birthDate && errors.birthDate}
                  type="date"
                  placeholder="Your birthdate"
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="gender"
                  error={touched.gender && errors.gender}
                  component={GenderSelector}
                  type="radio"
                  placeholder="Your gender"
                />
              </FormRow>
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="country"
                  fieldName="country"
                  type="text"
                  placeholder="Country"
                  component={Input}
                  error={touched.country && errors.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="city"
                  fieldName="city"
                  type="text"
                  placeholder="City"
                  component={Input}
                  error={touched.city && errors.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormRow>

              <FastField
                validateOnBlur
                validateOnChange
                name="heardFrom"
                fieldName="heardFrom"
                type="text"
                component={HeardFromSelector}
                error={touched.heardFrom && errors.heardFrom}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="password"
                fieldName="password"
                type="text"
                placeholder="Password"
                component={Input}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="passwordConfirmation"
                fieldName="passwordConfirmation"
                type="text"
                placeholder="Confirm your password"
                component={Input}
                error={
                  touched.passwordConfirmation && errors.passwordConfirmation
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormRow>
                <FormControlLabel
                  control={
                    <FastField
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

const StyledFormPaper = styled(Paper)`
  width: 30%;
  height: 95%;
`;

const FormButton = styled(Button)`
  width: 30%;
  height: 50%;
  font-size: 1rem;
`;
