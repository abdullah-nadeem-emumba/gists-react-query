import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    display: none;
  }
  & .MuiFormLabel-filled {
    display: none;
  }
  & label {
    color: #fff;
    font-weight: 10px;
  }
  & .MuiOutlinedInput-root {
    width: ${(props) => (props.fullWidth ? "100%" : "25em")};
    color: #fff;
    & fieldset {
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    }
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #fff;
`;
