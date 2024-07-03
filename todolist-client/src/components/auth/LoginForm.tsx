import { FormControlLabel } from "@mui/material";
import { Field } from "formik";
import { FC } from "react";
import { mapToField } from "../../utils/helpers";
import { userLoginSchema } from "../../utils/validators";
import { FormButton } from "../common/Button";
import CheckBox from "../common/CheckBox";
import { StyledForm, StyledFormikForm, StyledFormPaper } from "../common/Form";
import FormRow from "../common/FormRow";
import Input from "../common/Input";

const fields = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    componentType: "input"
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    componentType: "input"
  }
];

const authMapper = {
  input: Input
};

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
    <StyledFormPaper width={20} height={40}>
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
              {fields.map((field) =>
                mapToField(
                  field,
                  authMapper,
                  errors,
                  touched,
                  handleChange,
                  handleBlur
                )
              )}
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
