import React from "react";
import { LIST, CARD } from "../../constants/constants";
import TableView from "../TableView/TableView";
import ToggleView from "../../components/ToggleView/ToggleView";
import CardView from "../CardView/CardView";
import PaginationFooter from "../../components/PaginationFooter/PaginationFooter";
import Loader from "../../components/Loader/Loader";
import { LandingScreenProps } from "../../types/types";

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
  } = props;
  const displayScreen = () => (
    <div>
      <ToggleView viewType={viewType} setViewType={setViewType} />
      {viewType === LIST && (
        <TableView
          gists={gists}
          onRowClick={openGistDetails}
          handleStar={handleStar}
          handleUnstar={handleUnstar}
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
    </div>
  );
  return loading ? <Loader /> : <>{displayScreen()}</>;
}
