import React from "react";
import { LandingScreenProps } from "../../types/types";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView/CardView";
import { LIST, CARD } from "../../constants/constants";
import PaginationFooter from "../../components/PaginationFooter/PaginationFooter";
import Loader from "../../components/Loader/Loader";
import { FlexDiv, BlueText, FlexEnd } from "./LandingScreen.styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export default function LandingScreen(props: LandingScreenProps) {
  const {
    emptyScreen,
    gists,
    loading,
    count,
    openGistDetails,
    viewType,
    setViewType,
    page,
    handleChangePage,
    handleNextPage,
    handleStar,
    handleUnstar,
    headerChecked,
    onHeaderCheckedChange,
    onRowCheck,
    checkedRows,
    starSelected,
    unstarSelected,
  } = props;
  const displayScreen = () => (
    <div>
      {emptyScreen ? (
        <div>No Results Found!</div>
      ) : (
        <>
          <FlexEnd>
            {checkedRows?.length > 0 && (
              <>
                <FlexDiv onClick={unstarSelected}>
                  <StarBorderIcon sx={{ color: "#0C76FF" }} />
                  <BlueText>Unstar</BlueText>
                </FlexDiv>
                <FlexDiv onClick={starSelected}>
                  <StarIcon sx={{ color: "#0C76FF" }} />
                  <BlueText>Star</BlueText>
                </FlexDiv>
              </>
            )}
            <ToggleView viewType={viewType} setViewType={setViewType} />
          </FlexEnd>
          {viewType === LIST && (
            <TableView
              handleStar={handleStar}
              handleUnstar={handleUnstar}
              gists={gists}
              onRowClick={openGistDetails}
              onHeaderCheckedChange={onHeaderCheckedChange}
              headerChecked={headerChecked}
              onRowCheck={onRowCheck}
              checkedRows={checkedRows}
            />
          )}
          {viewType === CARD && (
            <CardView gists={gists} onCardClick={openGistDetails} />
          )}
        </>
      )}
      <PaginationFooter
        handleNextPage={handleNextPage}
        handleChangePage={handleChangePage}
        count={count}
        page={page}
      />
    </div>
  );
  return loading ? <Loader /> : <>{displayScreen()}</>;
}
