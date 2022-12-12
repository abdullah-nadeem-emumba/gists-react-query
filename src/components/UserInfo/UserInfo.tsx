import React from "react";
import { Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GistInfoDiv, StyledSpan } from "./UserInfo.styles";
import { UserInfoProps } from "../../types/types";
import { formattedTime, formattedDate } from "../../utils/utils";

export default function UserInfo(props: UserInfoProps) {
  const { item } = props;
  const filename = Object.keys(item.files)[0];
  const navigate = useNavigate();

  const openUserDetails = () => {
    navigate(`/profile/${item.owner.login}`, {
      state: {
        owner: item.owner,
      },
    });
  };

  return (
    <GistInfoDiv>
      <Avatar
        src={item.owner.avatar_url}
        sx={{ width: "3.1em", height: "3.1em" }}
      />
      <div>
        <Typography
          onClick={openUserDetails}
          align="left"
          sx={{ color: "#0C76FF", fontWeight: 700, cursor: "pointer" }}
        >
          {item.owner.login} / {filename}
          <StyledSpan></StyledSpan>
        </Typography>
        <Typography sx={{ color: "#a7a7a7" }} textAlign={"left"}>
          Created{" "}
          {`${formattedTime(item.created_at)} ${formattedDate(
            item.created_at
          )}`}
        </Typography>
        <Typography
          sx={{ color: "#a7a7a7", fontSize: ".65em", marginTop: "-2px" }}
          textAlign={"left"}
        >
          Broadcast Server
        </Typography>
      </div>
    </GistInfoDiv>
  );
}
