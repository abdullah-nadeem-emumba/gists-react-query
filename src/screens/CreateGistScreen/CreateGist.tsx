import React from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import GistForm from "../../views/GistForm/GistForm";
import GistHookForm from "../../views/GistHookForm/GistHookForm";
import useSearch from "../../utils/useSearch";

export default function CreateGist() {
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
      main={<GistHookForm />}
    />
  );
}
