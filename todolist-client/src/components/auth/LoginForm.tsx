import React, { FC } from "react";
import Form from "../common/Form";
import { userLoginSchema } from "../../utils/validators";
import { mapToField } from "../../utils/helpers";
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
}

const initialValues: LoginFormValues = {
  email: "",
  password: ""
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
    <Form
      initialErrors={initialValues}
      initialValues={initialValues}
      submitButtonText={"Login"}
      validationSchema={userLoginSchema}
      onSubmit={(values) => {
        handleLogin(values as unknown as LoginFormValues);
      }}
    >
      {fields.map((field) => mapToField(field, authMapper))}
    </Form>
  );
};

export default LoginForm;
