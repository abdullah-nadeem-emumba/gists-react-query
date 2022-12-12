import styled from "styled-components";
import { Link } from "@mui/material";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  border-bottom: 1px solid lightgray;
`;

export const StyledLink = styled(Link)`
  &&& {
    text-decoration: none;
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  padding-right: 6em;
  align-items: flex-end;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  padding-left: 2.5em;
  border-left: 1px solid lightgray;
  margin-bottom: 2em;
`;

export const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
`;

export const GithubLinkDiv = styled.div`
  padding: ".4em 3em";
  margin-top: "2em";
  border-radius: 9px;
  border: 1x solid lightgray;
`;
