import styled from "styled-components";
import { TableCell, TableRow } from "@mui/material";

export const StyledHeaderRow = styled(TableRow)`
  &&& {
    background-color: #def5ec;
  }
`;

export const StyledHeaderCell = styled(TableCell)`
  && {
    color: #787a79;
    font-weight: 700;
  }
`;

export const StyledTableCell = styled(TableCell)`
  && {
    color: #a7a7a7;
  }
  &.notebook-name {
    max-width: 5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;
`;
