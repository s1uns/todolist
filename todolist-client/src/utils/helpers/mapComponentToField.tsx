import styled from "@emotion/styled";
import { ErrorMessage } from "formik";
import { Field } from "formik";

export type ComponentObject = {
  name: string;
  type: string | undefined;
  placeholder: string;
  componentType: string;
};

const mapToField = (componentObject: ComponentObject, mapper: any) => {
  console.log("Object: ", componentObject);
  return (
    <StyledFieldContainer key={componentObject.name}>
      <Field
        component={mapper[componentObject.componentType]}
        {...componentObject}
      />
      {/* <ErrorMessage name={componentObject.name}>
        {(msg) => <StyledError>{msg}</StyledError>}
      </ErrorMessage> */}
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
  color: red;
  margin-top: -1.5rem;
  margin-bottom: 0.3rem;
`;

export default mapToField;
