import styled from "styled-components";
import { Button } from "@mui/material";

type StyledButtonProps = {
  customstyle?: string;
};

export const StyledButton = styled(Button)<StyledButtonProps>`
  &&& {
    min-width: 8em;
    text-transform: none;
    font-weight: 500;
    font-size: 1em;
    padding: 0.5em 0em;
    color: ${(props) => (props.customstyle === "light" ? "#5acba1" : "#FFF")};
    background-color: ${(props) =>
      props.customstyle === "light" ? "#FFF" : "#5acba1"};
  }
`;
