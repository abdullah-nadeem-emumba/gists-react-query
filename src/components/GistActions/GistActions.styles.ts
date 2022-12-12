import styled from "styled-components";
import { Typography, Card } from "@mui/material";

export const BlueText = styled(Typography)`
  color: #0c76ff;
`;

export const GistScreenContainer = styled.div`
  display: grid;
  grid-template-rows: 5.5em 50em;
  padding: 0 4.8em;
`;

export const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;
`;

export const ActionItemDiv = styled.div`
  display: flex;
  align-items: end;
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

export const StyledGistCard = styled(Card)`
  &&& {
    margin-top: 2em;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1.5em;
  border-bottom: 1px solid lightgray;
`;

export const CardContent = styled.div`
  padding: 0.5em 3.8em;
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: auto;
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
`;

export const CenterDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
