import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import { StyledBox } from "./Arrowbox.styles";

export default function ArrowsBox() {
  return (
    <StyledBox>
      <CodeIcon
        fontSize="small"
        sx={{
          width: "18px",
          height: "14px",
          color: "#a7a7a7",
        }}
      />
    </StyledBox>
  );
}
