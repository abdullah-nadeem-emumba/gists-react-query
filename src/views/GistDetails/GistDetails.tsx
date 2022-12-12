import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  StyledHeaderDiv,
  GistScreenContainer,
  StyledGistCard,
  CardHeader,
  CardContent,
  StyledText,
  LineNumberText,
  FlexDiv,
  CenterDiv,
  BlueText,
} from "./GistDetails.styles";
import { Typography } from "@mui/material";
import UserInfo from "../../components/UserInfo/UserInfo";
import GistActions from "../../components/GistActions/GistActions";
import ArrowsBox from "../../components/ArrowBox/Arrowbox";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { formatFileContent } from "../../utils/utils";
import {
  isGistStarred,
  getGistContent,
  starGist,
  unStarGist,
  deleteGist,
  forkGist,
} from "../../api/api";
import Loader from "../../components/Loader/Loader";

export default function GistDetails() {
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [filesData, setFilesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starred, setStarred] = useState<boolean | undefined>(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { files, owner, id, description } = state;
  const filename = Object.keys(files)[0];
  //const { user } = useContext(UserContext);
  const user = useSelector((state: RootState) => state.user);

  const checkGistStar = async (gistID: string) => {
    const res = await isGistStarred(gistID);
    setStarred(res);
  };

  const editGist = () => {
    navigate("/create", {
      state: { files: filesData, description, id },
    });
  };

  const deleteMyGist = async (gistID: string) => {
    const res = await deleteGist(gistID);
    if (res) navigate("/");
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

  const fork = async (gistID: string) => {
    const res = await forkGist(gistID);
  };

  const getFileContent = async () => {
    setLoading(true);
    try {
      const filesArr = Object.keys(files);
      let filesArray: any[] = [];
      filesArr.forEach(async (file) => {
        const res = await getGistContent(files[file].raw_url);
        filesArray.push({
          filename: file,
          content: res,
        });
      });
      const response = await getGistContent(files[filename].raw_url);
      const formattedContent = formatFileContent(response);
      setFilesData(filesArray);
      setFileContent(formattedContent);
    } catch (error) {
      if (error instanceof Error) return setError(error.message);
      setError(String(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    checkGistStar(id);
    getFileContent();
  }, []);

  const displayFileContent = () => {
    if (error) {
      return (
        <CenterDiv>
          <Typography>Unable to load gist...</Typography>
        </CenterDiv>
      );
    } else if (filecontent && filecontent.length > 0) {
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

  return loading ? (
    <Loader />
  ) : (
    <GistScreenContainer>
      <StyledHeaderDiv>
        <UserInfo item={state} />
        <GistActions
          toggleStar={toggleStar}
          starred={starred}
          user={user}
          owner={owner}
          id={id}
          fork={fork}
          editGist={editGist}
          deleteMyGist={deleteMyGist}
          showEditDelete={true}
        />
      </StyledHeaderDiv>
      <StyledGistCard elevation={5}>
        <CardHeader>
          <ArrowsBox />
          <BlueText>{filename}</BlueText>
        </CardHeader>
        <CardContent>{displayFileContent()}</CardContent>
      </StyledGistCard>
    </GistScreenContainer>
  );
}
