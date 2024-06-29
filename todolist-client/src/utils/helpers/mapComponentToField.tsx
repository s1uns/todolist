import { ErrorMessage } from "formik";
import { Field } from "react-final-form";

type ComponentObject = {
  name: string;
  type: string | undefined;
  placeholder: string;
  componentType: string;
};

const mapToField = (componentObject: ComponentObject, mapper: any) => {
  // create type for the mapper
  return (
    <div key={componentObject.name}>
      <Field
        {...componentObject}
        component={mapper[componentObject.componentType]}
      />
      <ErrorMessage name={componentObject.name} />
    </div>
  );
};

export default mapToField;
