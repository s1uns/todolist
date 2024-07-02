import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const userRegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .email("The email should be in corresponding format")
    .required("The email is required."),

  username: yup.string().required("The username is required."),
  firstName: yup.string().required("The first name is required."),
  lastName: yup.string().required("The last name is required."),
  birthDate: yup
    .date()
    .required("The birthday is required.")
    .min("1900-01-01", "You are too old for this s.")
    .max(new Date(Date.now()), "You are too young for this s. "),
  country: yup.string().required("The country is required."),
  city: yup.string().required("The city is required."),
  gender: yup.string().required("Your gender is required."),
  heardFrom: yup
    .array()
    .min(1, "Choose at least one source.")
    .required("Choose at least one source."),
  password: yup
    .string()
    .min(8, "password must contain 8 or more characters")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .required("The password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords mismatch.")
    .required("Confirm your password!")
});

export default userRegistrationSchema;
