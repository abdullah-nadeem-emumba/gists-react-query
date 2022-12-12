import React from "react";
import { LandingScreenProps } from "../../types/types";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView/CardView";
import { LIST, CARD } from "../../constants/constants";
import PaginationFooter from "../../components/PaginationFooter/PaginationFooter";
import Loader from "../../components/Loader/Loader";

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
  } = props;
  const displayScreen = () => (
    <div>
      {emptyScreen ? (
        <div>No Results Found!</div>
      ) : (
        <>
          <ToggleView viewType={viewType} setViewType={setViewType} />
          {viewType === LIST && (
            <TableView
              handleStar={handleStar}
              handleUnstar={handleUnstar}
              gists={gists}
              onRowClick={openGistDetails}
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
