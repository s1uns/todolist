import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Button, Paper } from "@mui/material";
import styled from "@emotion/styled";

interface FormProps<T> {
  submitButtonText: string;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  children: React.ReactNode;
  onSubmit: (values: T) => void;
}

const FormComponent = <T extends object>(props: FormProps<T>) => {
  const {
    submitButtonText,
    initialValues,
    validationSchema,
    children,
    onSubmit
  } = props;

  return (
    <Paper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            {children}
            <Button type="submit" disabled={isSubmitting}>
              {submitButtonText}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Paper>
  );
};

const StyledForm = styled(FormComponent)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default StyledForm;
