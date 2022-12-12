import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5acba1;
  height: 4em;
  padding: 1em 6em;
  color: #ffffff;
`;

export const RightDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.5em;
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
`;
