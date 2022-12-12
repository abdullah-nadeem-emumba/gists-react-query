import React from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import UserView from "../../views/UserView/UserView";
import { useParams } from "react-router-dom";
import useSearch from "../../utils/useSearch";

export default function UserProfile() {
  const { username } = useParams();
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
      main={<UserView username={username ? username : ""} />}
    />
  );
}
