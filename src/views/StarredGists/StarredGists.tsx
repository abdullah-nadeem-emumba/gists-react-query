import React from "react";
import { LIST, CARD } from "../../constants/constants";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView/CardView";
import PaginationFooter from "../../components/PaginationFooter/PaginationFooter";
import Loader from "../../components/Loader/Loader";
import {
  FlexDiv,
  FlexEnd,
  BlueText,
} from "../LandingScreen/LandingScreen.styles";
import { LandingScreenProps } from "../../types/types";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarredGists(props: LandingScreenProps) {
  const {
    loading,
    viewType,
    gists,
    setViewType,
    openGistDetails,
    page,
    count,
    handleChangePage,
    handleNextPage,
    handleStar,
    handleUnstar,
    onHeaderCheckedChange,
    onRowCheck,
    checkedRows,
    headerChecked,
    unstarSelected,
    emptyScreen,
  } = props;
  const displayScreen = () => (
    <div>
      {emptyScreen ? (
        <div>No results found</div>
      ) : (
        <>
          <FlexEnd>
            {checkedRows?.length > 0 && (
              <FlexDiv onClick={unstarSelected}>
                <StarBorderIcon sx={{ color: "#0C76FF" }} />
                <BlueText>Unstar</BlueText>
              </FlexDiv>
            )}
            <ToggleView viewType={viewType} setViewType={setViewType} />
          </FlexEnd>
          {viewType === LIST && (
            <TableView
              gists={gists}
              onRowClick={openGistDetails}
              handleStar={handleStar}
              handleUnstar={handleUnstar}
              onHeaderCheckedChange={onHeaderCheckedChange}
              headerChecked={headerChecked}
              onRowCheck={onRowCheck}
              checkedRows={checkedRows}
            />
          )}
          {viewType === CARD && (
            <CardView gists={gists} onCardClick={openGistDetails} />
          )}
          <PaginationFooter
            handleChangePage={handleChangePage}
            page={page}
            count={count}
            handleNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  );
  return loading ? <Loader /> : <>{displayScreen()}</>;
}
