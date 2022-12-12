import React from "react";
import Container from "../AppContainer/Container";
import { RootProps } from "../../types/types";

export default function Root(props: RootProps) {
  const { header, main } = props;
  return (
    <div>
      {header}
      <Container>{main}</Container>
    </div>
  );
}
