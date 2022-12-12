import styled from "styled-components";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledMenuItem = styled(MenuItem)`
  &&& {
    padding: 0;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
`;

export const StyledATag = styled.a`
  text-decoration: none;
  color: unset;
`;
