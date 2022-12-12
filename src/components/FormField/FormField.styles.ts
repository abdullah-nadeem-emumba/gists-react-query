import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledFormField = styled(TextField)`
  & label.Mui-focused {
    color: #a7a7a7;
  }
  & label {
    color: #a7a7a7;
    font-weight: 10px;
  }
  & .MuiOutlinedInput-root {
    width: ${(props) => (props.fullWidth ? "100%" : "25em")};
    & fieldset {
      border-color: #a7a7a7;
    }
    &:hover fieldset {
      border-color: #a7a7a7;
    }
    &.Mui-focused fieldset {
      border-color: #a7a7a7;
    }
  }
`;

export const StyledError = styled.p`
  text-align: left;
  color: #ff0033;
  margin-bottom: 0;
  font-size: 0.8em;
`;
