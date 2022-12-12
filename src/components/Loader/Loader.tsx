import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
`;

export default function Loader() {
  return (
    <CenterDiv>
      <CircularProgress />
    </CenterDiv>
  );
}
