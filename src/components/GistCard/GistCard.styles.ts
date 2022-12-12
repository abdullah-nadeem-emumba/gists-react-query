import styled from "styled-components";
import { Card, Typography } from "@mui/material";

export const GistDiv = styled.div`
  height: 12em;
  text-align: left;
  overflow: hidden;
`;

export const StyledCard = styled(Card)`
  &&& {
    min-width: 14em;
    padding: 0 1em 0 1em;
    cursor: pointer;
  }
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

export const TopBorderDiv = styled.div`
  margin-top: 0.5em;
  border-top: 1px solid #a7a7a7;
  padding-bottom: 0.5em;
`;

export const CenterDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
