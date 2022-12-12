import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserInfo from "../UserInfo/UserInfo";
import { Typography } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
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

export default function UserGist(props: UserGistProps) {
  const { item, onGistClick } = props;
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<boolean | undefined>(false);
  // const { user } = useContext(UserContext);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getFileContent();
    checkGistStar(item.id);
  }, []);

  const getFileContent = async () => {
    if (item) {
      setLoading(true);
      try {
        const filename = Object.keys(item.files)[0];
        const response = await getGistContent(item.files[filename].raw_url);
        const result = formatFileContent(response);
        setFileContent(result);
      } catch (e) {
        if (e instanceof Error) return setError(e.message);
        setError(String(error));
      }
      setLoading(false);
    }
  };

  const toggleStar = async (gistID: string) => {
    if (!starred) {
      const res = await starGist(gistID);
      if (res) setStarred(true);
    } else {
      const res = await unStarGist(gistID);
      if (res) setStarred(false);
    }
  };

  const checkGistStar = async (gistID: string) => {
    const res = await isGistStarred(gistID);
    setStarred(res);
  };

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const displayFileContent = () => {
    if (error) {
      return (
        <CenterDiv>
          <Typography>Unable to load gist...</Typography>
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
