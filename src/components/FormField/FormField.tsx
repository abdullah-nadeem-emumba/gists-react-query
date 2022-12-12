import React from "react";
import { useField } from "formik";
import { StyledFormField, StyledError } from "./FormField.styles";

export default function FormField(props: any) {
  const [field, meta, helper] = useField(props);
  return (
    <>
      <StyledFormField {...field} {...props} />
      {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}
    </>
  );
}
