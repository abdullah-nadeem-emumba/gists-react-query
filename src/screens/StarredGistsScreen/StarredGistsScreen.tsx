import React, { useState } from "react";
import { useQuery } from "react-query";
import Root from "../../layout/Root/Root";
import StarredGists from "../../views/StarredGists/StarredGists";
import Header from "../../layout/Header/Header";
import { getStarredGists, starGist, unStarGist } from "../../api/api";
import { useNavigate } from "react-router-dom";
import useSearch from "../../utils/useSearch";
import {
  useStarSelected,
  useUnstarSelected,
  useStarGist,
  useUnStarGist,
} from "../../utils/useStar";

export default function StarredGistsScreen() {
  const [viewType, setViewType] = useState("LIST");
  const [page, setPage] = useState(1);
  const [headerChecked, setHeaderChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [searchVal, handleSearchChange, handleSearch] = useSearch();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["search-gists", page], () =>
    getStarredGists(9, page)
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

  // const star = async (
  //   gistID: string,
  //   setStarred: (starred: boolean) => void
  // ) => {
  //   const res = await starGist(gistID);
  //   if (res) {
  //     setStarred(true);
  //     navigate(0);
  //   }
  // };

  // const unStar = async (
  //   gistID: string,
  //   setStarred: (starred: boolean) => void
  // ) => {
  //   const res = await unStarGist(gistID);
  //   if (res) {
  //     setStarred(false);
  //     navigate(0);
  //   }
  // };

  const star = (gistID: string, setStarred: (starred: boolean) => void) => {
    starGist(gistID);
    setStarred(true);
    navigate(0);
  };

  const unStar = (gistID: string, setStarred: (starred: boolean) => void) => {
    unStarGist(gistID);
    setStarred(false);
    navigate(0);
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
        <StarredGists
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
