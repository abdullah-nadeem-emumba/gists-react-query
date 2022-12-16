import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserInfo from "../UserInfo/UserInfo";
import { Typography } from "@mui/material";
import {
  LineNumberText,
  UpperDiv,
  StyledCard,
  CenterDiv,
  FlexDiv,
  StyledText,
} from "./UserGist.styles";
import { getGistContent, isGistStarred, forkGist } from "../../api/api";
import { formatFileContent } from "../../utils/utils";
import GistActions from "../GistActions/GistActions";
import { UserGistProps } from "../../types/types";
import { useUnStarGist, useStarGist } from "../../utils/useStar";
import Loader from "../Loader/Loader";

export default function UserGist(props: UserGistProps) {
  const { item, onGistClick } = props;
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<boolean | undefined>(false);
  const user = useSelector((state: RootState) => state.user);

  const { mutate: starGist, isError: starErr } = useStarGist();
  const { mutate: unStarGist, isError: unstarErr } = useUnStarGist();

  const onSuccess = (data: boolean) => {
    setStarred(data);
  };

  const onError = () => {
    alert("Something went wrong! Please try again.");
  };

  useQuery(["check-gist-star", item.id], () => isGistStarred(item.id), {
    onSuccess,
    onError,
  });

  const getFileContent = async () => {
    if (item) {
      try {
        const filename = Object.keys(item.files)[0];
        const response = await getGistContent(item.files[filename].raw_url);
        const result = formatFileContent(response);
        setFileContent(result);
      } catch (e) {
        if (e instanceof Error) return setError(e.message);
        setError(String(error));
      }
    }
  };

  const { isLoading, isError } = useQuery(
    ["file-content", item],
    getFileContent
  );

  const toggleStar = async (gistID: string) => {
    if (!starred) {
      starGist(gistID);
      setStarred(true);
      if (starErr) setStarred(false);
    } else {
      unStarGist(gistID);
      setStarred(false);
      if (unstarErr) setStarred(true);
    }
  };

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const displayFileContent = () => {
    if (error || isError) {
      return (
        <CenterDiv>
          <Typography>Unable to load gist...</Typography>
        </CenterDiv>
      );
    } else if (isLoading) {
      return <Loader />;
    } else if (filecontent.length > 0) {
      return React.Children.toArray(
        filecontent.map((line, index) => {
          return (
            <FlexDiv>
              {" "}
              <LineNumberText>{index + 1}</LineNumberText>
              <StyledText>{line}</StyledText>
            </FlexDiv>
          );
        })
      );
    }
  };
  return (
    <>
      <UpperDiv>
        <UserInfo item={item} />
        <GistActions
          toggleStar={toggleStar}
          starred={starred}
          user={user}
          owner={item.owner}
          id={item.id}
          fork={fork}
          showEditDelete={false}
        />
      </UpperDiv>
      <StyledCard onClick={() => onGistClick(item)} elevation={3}>
        {displayFileContent()}
      </StyledCard>
    </>
  );
}
