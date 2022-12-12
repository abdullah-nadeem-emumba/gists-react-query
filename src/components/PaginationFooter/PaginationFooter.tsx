import React from "react";
import {
  StyledDiv,
  PaginationDiv,
  StyledFooter,
} from "./PaginationFooter.styles";
import { Pagination } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../Button/Button";
import { PaginationFooterProps } from "../../types/types";

export default function PaginationFooter(props: PaginationFooterProps) {
  const { handleNextPage, handleChangePage, count, page } = props;
  return (
    <StyledFooter>
      <StyledDiv>
        <Button
          customstyle="dark"
          onClick={handleNextPage}
          text={"Next Page"}
          type="button"
        >
          <ArrowForwardIcon sx={{ marginLeft: ".2em" }} />
        </Button>
      </StyledDiv>
      <PaginationDiv>
        <Pagination page={page} count={count} onChange={handleChangePage} />
      </PaginationDiv>
    </StyledFooter>
  );
}
