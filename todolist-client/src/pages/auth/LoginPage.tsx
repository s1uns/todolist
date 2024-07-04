import { Button, FormControlLabel, Paper, styled } from "@mui/material";
import { FastField, Field, Form, Formik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckBox from "../../components/common/CheckBox";
import FormRow from "../../components/common/FormRow";
import Input from "../../components/common/Input";
import { loginUserRequest } from "../../store/actions/authActions";
import { userLoginSchema } from "../../utils/validators";

interface LoginPageValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginPageValues = {
  email: "",
  password: "",
  rememberMe: false
};

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const handleLogin = (values: LoginPageValues) => {
    const { email, password } = values;
    console.log("Login: ", values);
    console.log("Request: ", loginUserRequest);

    dispatch(
      loginUserRequest({
        email: email,
        password: password
      })
    );
  };

  return (
    <StyledFormPaper>
      <StyledFormikForm
        initialValues={initialValues}
        validationSchema={userLoginSchema}
        onSubmit={(values) => {
          handleLogin(values as unknown as LoginPageValues);
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
                <Link to="/registration">Register now</Link>
                <a href="/register">Forgot password?</a>
                {/* Add drop password page*/}
              </FormRow>
            </StyledForm>
          );
        }}
      </StyledFormikForm>
    </StyledFormPaper>
  );
};

export default LoginPage;

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
