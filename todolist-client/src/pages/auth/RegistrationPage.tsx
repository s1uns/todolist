import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FastField, Form, Formik, FormikErrors, FormikValues } from "formik";
import { ChangeEvent, FC, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { checkEmailAvailability } from "../../api/auth";
import GenderSelector from "../../components/auth/GenderSelector";
import HeardFromSelector from "../../components/auth/HeardFromSelector";
import CheckBox from "../../components/common/CheckBox";
import DatePicker from "../../components/common/DatePicker";
import FormRow from "../../components/common/FormRow";
import Input from "../../components/common/Input";
import { registerUserRequest } from "../../store/actions/authActions";
import { useAppDispatch } from "../../store/store";
import { userRegistrationSchema } from "../../utils/validators";

const emailSchema = yup.object().shape({ email: yup.string().email() });

interface RegistrationPageValues {
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

const initialValues: RegistrationPageValues = {
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
const RegistrationPage: FC = () => {
  const dispatch = useAppDispatch();
  const [emailErrors, setEmailErrors] = useState<string | null>(null);

  const handleRegistration = (values: RegistrationPageValues) => {
    dispatch(registerUserRequest(values));
  };

  const handleEmailChange = async (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormikValues>>
  ) => {
    const value = e.target.value;
    const valid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    if (valid) {
      const response = await checkEmailAvailability(value);
      if (response.success) {
        setEmailErrors(response.data ? null : "The email is taken");
      } else {
        setEmailErrors("Couldn't get the email availability");
      }
    }
    setFieldValue("email", value);
  };

  const handleBirthDate = (
    value: Dayjs,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormikValues>>
  ) => {
    setFieldValue("birthDate", dayjs(value).format());
  };

  return (
    <StyledFormPaper>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userRegistrationSchema}
        onSubmit={(values) => {
          handleRegistration(values as unknown as RegistrationPageValues);
        }}
      >
        {({ errors, touched, handleChange, setFieldValue }) => {
          return (
            <StyledForm>
              <FastField
                validateOnBlur
                validateOnChange
                name="email"
                placeholder="Email"
                component={Input}
                error={
                  emailErrors ? emailErrors : touched.email && errors.email
                }
                onChange={(
                  e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => handleEmailChange(e, setFieldValue)}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="username"
                placeholder="Username"
                component={Input}
                error={touched.username && errors.username}
              />
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="firstName"
                  placeholder="First Name"
                  component={Input}
                  error={touched.firstName && errors.firstName}
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="lastName"
                  placeholder="Last Name"
                  component={Input}
                  error={touched.lastName && errors.lastName}
                />
              </FormRow>
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="birthDate"
                  component={DatePicker}
                  placeholder="Your birthdate"
                  error={touched.birthDate && errors.birthDate}
                  onChange={(value: Dayjs) =>
                    handleBirthDate(value, setFieldValue)
                  }
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="gender"
                  component={GenderSelector}
                  placeholder="Your gender"
                  error={touched.gender && errors.gender}
                />
              </FormRow>
              <FormRow fieldsGap={5}>
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="country"
                  placeholder="Country"
                  component={Input}
                  error={touched.country && errors.country}
                />
                <FastField
                  validateOnBlur
                  validateOnChange
                  name="city"
                  placeholder="City"
                  component={Input}
                  error={touched.city && errors.city}
                />
              </FormRow>

              <FastField
                validateOnBlur
                validateOnChange
                name="heardFrom"
                component={HeardFromSelector}
                error={touched.heardFrom && errors.heardFrom}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="password"
                type="password"
                placeholder="Password"
                component={Input}
                error={touched.password && errors.password}
              />
              <FastField
                validateOnBlur
                validateOnChange
                name="passwordConfirmation"
                type="password"
                placeholder="Confi  rm your password"
                component={Input}
                error={
                  touched.passwordConfirmation && errors.passwordConfirmation
                }
              />
              <FormRow>
                <FastField
                  name="rememberMe"
                  type="checkbox"
                  label={"Remember me"}
                  component={CheckBox}
                  onChange={handleChange}
                />

                <FormButton type="submit">Registration</FormButton>
              </FormRow>
              <Link to="/login">Already have an account? Log in!</Link>
            </StyledForm>
          );
        }}
      </StyledFormikForm>
    </StyledFormPaper>
  );
};

export default RegistrationPage;

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
