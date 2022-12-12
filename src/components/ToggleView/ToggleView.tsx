import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { LIST, CARD } from "../../constants/constants";
import { StyledDiv, LeftDiv, RightDiv } from "./ToggleView.styles";
import { ToggleViewProps } from "../../types/types";

export default function ToggleView(props: ToggleViewProps) {
  const { viewType, setViewType } = props;
  return (
    <StyledDiv>
      <LeftDiv>
        <GridViewIcon
          onClick={() => setViewType(CARD)}
          sx={{
            color: viewType === CARD ? "#5acba1" : "gray",
            width: "1.2em",
            height: "1.2em",
            cursor: "pointer",
          }}
        />
      </LeftDiv>
      <RightDiv>
        <FormatListBulletedIcon
          onClick={() => setViewType(LIST)}
          sx={{
            color: viewType === LIST ? "#5acba1" : "gray",
            width: "1.2em",
            height: "1.2em",
            cursor: "pointer",
          }}
        />
      </RightDiv>
    </StyledDiv>
  );
}
