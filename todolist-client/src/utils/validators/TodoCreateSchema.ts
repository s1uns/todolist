import * as yup from "yup";

const todoCreateScheme = yup
  .object()
  .shape({ title: yup.string().required("The todo's title is required.") });

export default todoCreateScheme;
