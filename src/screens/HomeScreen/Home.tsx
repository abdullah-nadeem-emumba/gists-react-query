import React, { useState } from "react";
import { useQuery } from "react-query";
import Root from "../../layout/Root/Root";
import LandingScreen from "../../views/LandingScreen/LandingScreen";
import Header from "../../layout/Header/Header";
import { getPublicGists } from "../../api/api";
import { useNavigate } from "react-router-dom";
import useSearch from "../../utils/useSearch";
import {
  useStarGist,
  useUnStarGist,
  useStarSelected,
  useUnstarSelected,
} from "../../utils/useStar";

export default function Home() {
  const [viewType, setViewType] = useState("LIST");
  const [page, setPage] = useState(1);
  const [headerChecked, setHeaderChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [searchVal, handleSearchChange, handleSearch] = useSearch();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(
    ["public-gists", page],
    () => getPublicGists(9, page),
    { refetchInterval: 60000 }
  );

  const onHeaderCheckedChange = (e: any) => {
    setHeaderChecked(e.target.checked);
    if (e.target.checked) {
      const gistIDs = data.map((item: any) => item.id);
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

  const { mutate: starGist } = useStarGist();
  const { mutate: unStarGist } = useUnStarGist();

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

  const star = (gistID: string, setStarred: (starred: boolean) => void) => {
    starGist(gistID);
    setStarred(true);
  };

  const unStar = (gistID: string, setStarred: (starred: boolean) => void) => {
    unStarGist(gistID);
    setStarred(false);
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
