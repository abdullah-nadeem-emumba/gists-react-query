import React from "react";
import { StyledContainer } from "./Container.styles";

export default function Container(props: any) {
  const { children } = props;
  return <StyledContainer>{children}</StyledContainer>;
}
