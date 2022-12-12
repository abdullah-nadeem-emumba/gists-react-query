import React from "react";
import { StyledButton } from "./Button.styles";
import { ButtonProps } from "../../types/types";

export default function Button(props: ButtonProps) {
  const { text, customstyle } = props;
  return (
    <StyledButton
      customstyle={customstyle}
      onClick={props?.onClick}
      type={props?.type}
    >
      {text}
      {props?.children}
    </StyledButton>
  );
}
