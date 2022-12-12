import React from "react";
import { useField } from "formik";
import { StyledFormField, StyledError } from "../FormField/FormField.styles";

export default function FormHookField(props: any) {
  return (
    <>
      <StyledFormField {...props} />
    </>
  );
}
