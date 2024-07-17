import * as yup from "yup";

const todoUpdateScheme = yup.object().shape({
  id: yup.string().required("The todo's id is required."),
  newTitle: yup.string().required("The todo's title is required.")
});

export default todoUpdateScheme;
