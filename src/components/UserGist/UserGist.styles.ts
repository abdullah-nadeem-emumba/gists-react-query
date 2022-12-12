import styled from "styled-components";
import { Typography, Card } from "@mui/material";

export const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  margin-left: -1em;
`;

export const EachDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3em;
  cursor: pointer;
`;

export const BorderedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 0em 0.9em;
  border: 1px solid lightgray;
  border-radius: 10%;
  margin-left: 0.4em;
`;

export const StyledDiv = styled.div`
  display: flex;
`;

export const StyledCard = styled(Card)`
  width: inherit;
  max-width: 40em;
  padding: 0.2em 0.7em;
  min-height: 15em;
  overflow: hidden;
`;

export const StyledText = styled(Typography)`
  &&& {
    font-size: 0.9em;
  }
`;

export const LineNumberText = styled(Typography)`
  margin-right: 1.5em;
  color: #a7a7a7;
  &&& {
    font-size: 0.9em;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  column-gap: 1.2em;
  overflow: hidden;
  max-height: 1.5em;
  overflow-x: auto;
`;

export const CenterDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
