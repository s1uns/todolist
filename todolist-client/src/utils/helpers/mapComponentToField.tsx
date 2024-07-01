import { ErrorMessage } from "formik";
import { Field } from "formik";

type ComponentObject = {
  name: string;
  type: string | undefined;
  placeholder: string;
  componentType: string;
};

const mapToField = (componentObject: ComponentObject, mapper: any) => {
  return (
    <div style={{ width: "100%" }} key={componentObject.name}>
      <Field
        touched={true}
        component={mapper[componentObject.componentType]}
        {...componentObject}
      />
      <ErrorMessage name={componentObject.name}>
        {(msg) => <div style={{ color: "red" }}>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default mapToField;
