import styled from "@emotion/styled";
import {
  ErrorMessage,
  FastField,
  FormikErrors,
  FormikTouched,
  FormikValues
} from "formik";
import { Field } from "formik";

export type ComponentObject = {
  name: string;
  type?: string;
  placeholder: string;
  componentType: string;
};

const mapToField = (
  componentObject: ComponentObject,
  mapper: any,
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>
) => {
  return (
    <StyledFieldContainer key={componentObject.name}>
      <FastField
        validateOnBlur
        validateOnChange
        component={mapper[componentObject.componentType]}
        type={componentObject.placeholder}
        name={componentObject.name}
        placeholder={componentObject.placeholder}
        error={errors[componentObject.name]}
        touched={touched[componentObject.name]}
      />
    </StyledFieldContainer>
  );
};

const StyledFieldContainer = styled.div`
  width: 100%;
`;

export default mapToField;
