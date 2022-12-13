import React, { useState } from "react";
import { useQuery } from "react-query";
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
  const [error, setError] = useState("");

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

  const { isLoading, data, isError } = useQuery(
    ["file-content", item],
    getFileContent
  );

  const displayFileContent = () => {
    if (error || isError) {
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
      <GistDiv>{isLoading ? <Loader /> : displayFileContent()}</GistDiv>
      <TopBorderDiv>
        <UserInfo item={item} />
      </TopBorderDiv>
    </StyledCard>
  );
}
