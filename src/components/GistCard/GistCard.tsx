import React, { useState, useEffect } from "react";
import {
  GistDiv,
  StyledCard,
  StyledText,
  LineNumberText,
  FlexDiv,
  TopBorderDiv,
  CenterDiv,
} from "./GistCard.styles";
import UserInfo from "../UserInfo/UserInfo";
import { Typography } from "@mui/material";
import { GistCardProps } from "../../types/types";
import { getGistContent } from "../../api/api";
import { formatFileContent } from "../../utils/utils";
import Loader from "../Loader/Loader";

export default function GistCard(props: GistCardProps) {
  const { onCardClick, item } = props;
  const [filecontent, setFileContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getFileContent();
  }, []);

  const getFileContent = async () => {
    if (item) {
      setLoading(true);
      try {
        const filename = Object.keys(item.files)[0];
        console.log(filename);
        const response = await getGistContent(item.files[filename].raw_url);
        const result = formatFileContent(response);
        console.log(result);

        setFileContent(result);
      } catch (e) {
        if (e instanceof Error) return setError(e.message);
        setError(String(error));
      }
      setLoading(false);
    }
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
    <StyledCard onClick={() => onCardClick(item)}>
      <GistDiv>{loading ? <Loader /> : displayFileContent()}</GistDiv>
      <TopBorderDiv>
        <UserInfo item={item} />
      </TopBorderDiv>
    </StyledCard>
  );
}
