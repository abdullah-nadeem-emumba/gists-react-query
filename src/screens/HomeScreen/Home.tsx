import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Root from "../../layout/Root/Root";
import LandingScreen from "../../views/LandingScreen/LandingScreen";
import Header from "../../layout/Header/Header";
import { getPublicGists } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import useSearch from "../../utils/useSearch";
import { useStarGist, useUnStarGist } from "../../utils/useStar";

export default function Home() {
  const [viewType, setViewType] = useState("LIST");
  //const [loading, setLoading] = useState(false);
  //const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, handleSearchChange, handleSearch] = useSearch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLoading, data } = useQuery(["public-gists", page], () =>
    getPublicGists(9, page)
  );

  const { mutate: starGist, isError: starErr } = useStarGist();
  const { mutate: unStarGist, isError: unstarErr } = useUnStarGist();

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

  // useEffect(() => {
  //   console.log(state);
  //   getData();
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [page]);

  // const getData = async () => {
  //   setLoading(true);
  //   const data = await getPublicGists(9, page);
  //   if (data) {
  //     setGists(data);
  //   }
  //   setLoading(false);
  // };

  const star = (gistID: string, setStarred: (starred: boolean) => void) => {
    starGist(gistID);
    setStarred(true);
    if (starErr) setStarred(false);
  };

  const unStar = (gistID: string, setStarred: (starred: boolean) => void) => {
    unStarGist(gistID);
    setStarred(false);
    if (unstarErr) setStarred(true);
  };

  // const handleKeypress = async (e: KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     await getData();
  //   }
  // };

  return (
    <Root
      header={
        <Header
          searchVal={searchVal}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
      }
      main={
        <LandingScreen
          viewType={viewType}
          setViewType={setViewType}
          gists={data}
          loading={isLoading}
          count={data?.length}
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
