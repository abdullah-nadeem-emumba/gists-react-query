import React, { useState, useEffect } from "react";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import LandingScreen from "../../views/LandingScreen/LandingScreen";
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchedGists, starGist, unStarGist } from "../../api/api";

export default function SearchScreen() {
  const [viewType, setViewType] = useState("LIST");
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [emptyScreen, setEmptyScreen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const searchGists = async (searchValue: string) => {
    setLoading(true);
    const data = await getSearchedGists(searchValue, 9, page);
    console.log(data);
    if (data.length > 0) {
      setGists(data);
      setEmptyScreen(false);
    } else {
      setEmptyScreen(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (state.hasOwnProperty("searchUserName")) {
      searchGists(state?.searchUserName);
    }
  }, []);

  useEffect(() => {
    if (searchVal) {
      searchGists(searchVal);
    } else {
      searchGists(state?.searchUserName);
    }
  }, [page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const star = async (
    gistID: string,
    setStarred: (starred: boolean) => void
  ) => {
    const res = await starGist(gistID);
    if (res) {
      setStarred(true);
    }
  };

  const unStar = async (
    gistID: string,
    setStarred: (starred: boolean) => void
  ) => {
    const res = await unStarGist(gistID);
    if (res) {
      setStarred(false);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const openGistDetails = (gist: any) => {
    navigate("/gistdetails", { state: { ...gist } });
  };
  return (
    <Root
      header={
        <Header
          searchVal={searchVal}
          handleSearchChange={handleSearchChange}
          handleSearch={() => searchGists(searchVal)}
        />
      }
      main={
        <LandingScreen
          emptyScreen={emptyScreen}
          viewType={viewType}
          setViewType={setViewType}
          gists={gists}
          loading={loading}
          count={gists.length}
          openGistDetails={openGistDetails}
          handleChangePage={handleChangePage}
          handleNextPage={handleNextPage}
          page={page}
          handleStar={star}
          handleUnstar={unStar}
        />
      }
    />
  );
}
