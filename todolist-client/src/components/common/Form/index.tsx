import React from "react";
import { Formik, Form as FormikForm, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { Button, Paper } from "@mui/material";
import styled from "@emotion/styled";

interface FormProps<T extends object> {
  submitButtonText: string;
  initialValues: T;
  initialErrors: T;
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
    <Paper sx={{ width: "50%", height: "50%" }}>
      <Formik
        validateOnBlur
        initialErrors={initialValues}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <FormikForm
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {children}
            <Button type="submit" disabled={!isValid}>
              {submitButtonText}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Paper>
  );
};

const StyledForm = styled(FormComponent)`
  width: 100hw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export default StyledForm;
