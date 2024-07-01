import React, { FC } from "react";
import Form from "../common/Form";
import { userLoginSchema } from "../../utils/validators";
import { Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const handleLogin = (values: LoginFormValues) => {
    const { email, password } = values;

    // dispatch(
    //     loginUserRequest({
    //         email: email,
    //         password: password,
    //     })
    // );

    return;
  };

  return (
    <Form<LoginFormValues>
      initialValues={initialValues}
      submitButtonText={"Login"}
      validationSchema={userLoginSchema}
      onSubmit={handleLogin}
    >
      <div>
        <Field name="email" type="email" as={TextField} label="Email" fullWidth />
        <ErrorMessage name="email" component="div" />
      </div>
      <div>
        <Field name="password" type="password" as={TextField} label="Password" fullWidth />
        <ErrorMessage name="password" component="div" />
      </div>
    </Form>
  );
};

export default LoginForm;
