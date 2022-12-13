import React, { useState, useEffect } from "react";
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
import {
  starGist,
  unStarGist,
  getGistContent,
  isGistStarred,
  forkGist,
} from "../../api/api";
import { formatFileContent } from "../../utils/utils";
import GistActions from "../GistActions/GistActions";
import { UserGistProps } from "../../types/types";
import { useUnStarGist, useStarGist, useIsStarred } from "../../utils/useStar";
import Loader from "../Loader/Loader";

export default function UserGist(props: UserGistProps) {
  const { item, onGistClick } = props;
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<boolean | undefined>(false);
  const user = useSelector((state: RootState) => state.user);

  const { mutate: starGist, isError: starErr } = useStarGist();
  const { mutate: unStarGist, isError: unstarErr } = useUnStarGist();

  // useEffect(() => {
  //   getFileContent();
  //   checkGistStar(item.id);
  // }, []);

  const onSuccess = (data: any) => {
    setStarred(data);
  };

  useQuery(["check-gist-star", item.id], () => isGistStarred(item.id), {
    onSuccess,
  });

  // useEffect(() => {
  //   getFileContent();
  //   checkGistStar(item.id);
  // }, [item.id]);

  const getFileContent = async () => {
    if (item) {
      //setLoading(true);
      try {
        const filename = Object.keys(item.files)[0];
        const response = await getGistContent(item.files[filename].raw_url);
        const result = formatFileContent(response);
        setFileContent(result);
      } catch (e) {
        if (e instanceof Error) return setError(e.message);
        setError(String(error));
      }
      //setLoading(false);
    }
  };

  const { isLoading, data, isError } = useQuery(
    ["file-content", item],
    getFileContent
  );

  // const toggleStar = async (gistID: string) => {
  //   if (!starred) {
  //     const res = await starGist(gistID);
  //     if (res) setStarred(true);
  //   } else {
  //     const res = await unStarGist(gistID);
  //     if (res) setStarred(false);
  //   }
  // };
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

  // const checkGistStar = async (gistID: string) => {
  //   const res = await isGistStarred(gistID);
  //   setStarred(res);
  // };

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const displayFileContent = () => {
    if (error) {
      return (
        <CenterDiv>
          {isLoading ? (
            <Loader />
          ) : (
            <Typography>Unable to load gist...</Typography>
          )}
        </CenterDiv>
      );
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
