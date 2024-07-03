import styled from "@emotion/styled";
import { FastField, FormikErrors, FormikTouched, FormikValues } from "formik";

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
  touched: FormikTouched<FormikValues>,
  handleChange: (e: React.ChangeEvent<any>) => void,
  handleBlur: (e: any) => void
) => {
  return (
    <StyledFieldContainer key={componentObject.name}>
      <FastField
        validateOnBlur
        validateOnChange
        component={mapper[componentObject.componentType]}
        type={componentObject.placeholder}
        name={componentObject.name}
        fieldName={componentObject.name}
        onChange={handleChange}
        onBlur={handleBlur}
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
