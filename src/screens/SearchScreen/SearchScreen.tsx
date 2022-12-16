import React, { useState } from "react";
import { useQuery } from "react-query";
import Root from "../../layout/Root/Root";
import Header from "../../layout/Header/Header";
import LandingScreen from "../../views/LandingScreen/LandingScreen";
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchedGists } from "../../api/api";
import {
  useStarGist,
  useUnStarGist,
  useStarSelected,
  useUnstarSelected,
} from "../../utils/useStar";

export default function SearchScreen() {
  const [viewType, setViewType] = useState("LIST");
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [headerChecked, setHeaderChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    isLoading,
    data: gists,
    refetch,
    isError,
  } = useQuery(
    ["search-gists", page],
    () => getSearchedGists(searchVal || state?.searchUserName, 9, page),
    { cacheTime: 0 }
  );

  const onHeaderCheckedChange = (e: any) => {
    setHeaderChecked(e.target.checked);
    if (e.target.checked) {
      const gistIDs = gists.map((item: any) => item.id);
      setCheckedRows([...gistIDs]);
    } else {
      setCheckedRows([]);
    }
  };

  const onRowCheck = (e: any, gistID: string) => {
    if (e.target.checked) {
      addGistToChecked(gistID);
    } else {
      removeGistFromChecked(gistID);
    }
  };

  console.log({ checkedRows });

  const addGistToChecked = (gistID: string) => {
    setCheckedRows([...checkedRows, gistID]);
  };

  const removeGistFromChecked = (gistID: string) => {
    setCheckedRows((items) => items.filter((item) => item !== gistID));
  };

  const { mutate: starGist, isError: starErr } = useStarGist();
  const { mutate: unStarGist, isError: unstarErr } = useUnStarGist();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

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

  const OnSelectedSuccess = () => {
    setCheckedRows([]);
    setHeaderChecked(false);
  };

  const { mutate: starSelected } = useStarSelected(
    checkedRows,
    OnSelectedSuccess
  );

  const { mutate: unstarSelected } = useUnstarSelected(
    checkedRows,
    OnSelectedSuccess
  );

  return (
    <Root
      header={
        <Header
          searchVal={searchVal}
          handleSearchChange={handleSearchChange}
          handleSearch={refetch}
        />
      }
      main={
        <LandingScreen
          emptyScreen={isError || gists?.length < 1}
          viewType={viewType}
          setViewType={setViewType}
          gists={gists}
          loading={isLoading}
          count={gists?.length}
          openGistDetails={openGistDetails}
          handleChangePage={handleChangePage}
          handleNextPage={handleNextPage}
          page={page}
          handleStar={star}
          handleUnstar={unStar}
          headerChecked={headerChecked}
          onHeaderCheckedChange={onHeaderCheckedChange}
          onRowCheck={onRowCheck}
          checkedRows={checkedRows}
          starSelected={starSelected}
          unstarSelected={unstarSelected}
        />
      }
    />
  );
}
