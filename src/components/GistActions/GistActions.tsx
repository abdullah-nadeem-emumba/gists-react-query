import React from "react";
import {
  HeaderRightDiv,
  ActionItemDiv,
  BorderedDiv,
  BlueText,
} from "./GistActions.styles";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { GistActionsProps } from "../../types/types";

export default function GistActions(props: GistActionsProps) {
  const {
    starred,
    toggleStar,
    fork,
    editGist,
    user,
    owner,
    id,
    showEditDelete,
  } = props;
  const showGistActions = () => {
    return user.username ? (
      <>
        {user.username === owner.login && showEditDelete && (
          <>
            {" "}
            <ActionItemDiv onClick={editGist}>
              <EditIcon sx={{ color: "#0C76FF" }} />
              <BlueText>Edit</BlueText>
            </ActionItemDiv>
            <ActionItemDiv onClick={() => props.deleteMyGist?.(id)}>
              <DeleteIcon sx={{ color: "#0C76FF" }} />
              <BlueText>Delete</BlueText>
            </ActionItemDiv>
          </>
        )}
        <ActionItemDiv onClick={() => toggleStar(id)}>
          {starred ? (
            <StarIcon sx={{ color: "#0C76FF" }} />
          ) : (
            <StarBorderIcon sx={{ color: "#0C76FF" }} />
          )}
          <BlueText>Star</BlueText>
          <BorderedDiv>
            <Typography
              sx={{
                fontSize: ".9em",
                margin: "0.2em 0 0 0",
                padding: 0,
                color: "#787a79",
              }}
            >
              {starred ? 1 : 0}
            </Typography>
          </BorderedDiv>
        </ActionItemDiv>
        <ActionItemDiv onClick={() => fork(id)}>
          <StarBorderIcon sx={{ color: "#0C76FF" }} />
          <BlueText>Fork</BlueText>
          <BorderedDiv>
            <Typography
              sx={{
                fontSize: ".9em",
                margin: "0.2em 0 0 0",
                padding: 0,
                color: "#787a79",
              }}
            >
              0
            </Typography>
          </BorderedDiv>
        </ActionItemDiv>
      </>
    ) : null;
  };
  return <HeaderRightDiv>{showGistActions()}</HeaderRightDiv>;
}
