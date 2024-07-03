import { Button, FormControlLabel, Paper, styled } from "@mui/material";
import { FastField, Field, Form, Formik } from "formik";
import { FC } from "react";
import { userLoginSchema } from "../../utils/validators";
import CheckBox from "../common/CheckBox";
import FormRow from "../common/FormRow";
import Input from "../common/Input";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false
};

const LoginForm: FC = () => {
  const handleLogin = (values: LoginFormValues) => {
    const { email, password } = values;
    console.log("Login: ", values);

    // dispatch(
    //     loginUserRequest({
    //         email: email,
    //         password: password,
    //     })
    // );
  };

  return (
    <StyledFormPaper>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userLoginSchema}
        onSubmit={(values) => {
          handleLogin(values as unknown as LoginFormValues);
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => {
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
                name="password"
                fieldName="password"
                type="text"
                placeholder="Password"
                component={Input}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormRow>
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
                <FormButton type="submit">Login</FormButton>
              </FormRow>
              <FormRow>
                <a href="/register">Register now</a>
                <a href="/register">Forgot password?</a>
              </FormRow>
            </StyledForm>
          );
        }}
      </StyledFormikForm>
    </StyledFormPaper>
  );
};

export default LoginForm;

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
  width: 20%;
  height: 40%;
`;
const FormButton = styled(Button)`
  width: 30%;
  height: 50%;
  font-size: 1rem;
`;
