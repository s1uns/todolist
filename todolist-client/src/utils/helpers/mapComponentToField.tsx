import styled from "@emotion/styled";
import { ErrorMessage, FormikErrors, FormikValues } from "formik";
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
  errors: FormikErrors<FormikValues>
) => {
  return (
    <StyledFieldContainer key={componentObject.name}>
      <Field
        component={mapper[componentObject.componentType]}
        {...componentObject}
      />
      {errors[componentObject.name] ? (
        <StyledError>
          {errors[componentObject.name] as unknown as string}
        </StyledError>
      ) : (
        <StyledError>&nbsp;</StyledError>
      )}
    </StyledFieldContainer>
  );
};

const StyledFieldContainer = styled.div`
  width: 100%;
`;

const StyledField = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledError = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  color: red;
`;

export default mapToField;
