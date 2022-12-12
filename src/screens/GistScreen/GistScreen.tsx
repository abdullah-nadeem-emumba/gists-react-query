import React from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import GistDetails from "../../views/GistDetails/GistDetails";
import useSearch from "../../utils/useSearch";

export default function GistScreen() {
  const [searchVal, handleSearchChange, handleSearch] = useSearch();

  return (
    <Root
      header={
        <Header
          searchVal={searchVal}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
      }
      main={<GistDetails />}
    />
  );
}
