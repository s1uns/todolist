import * as yup from "yup";

const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("The email should be in corresponding format")
    .required("The email is required."),
  password: yup.string().required("The password is required.")
});

export default userLoginSchema;
