import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import UserGist from "../../components/UserGist/UserGist";
import { Typography, Avatar, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserGists, getAuthUserGists } from "../../api/api";
import {
  GridContainer,
  LeftDiv,
  RightDiv,
  CenterDiv,
  StyledLink,
} from "./UserView.styles";
import Loader from "../../components/Loader/Loader";
import { RootState } from "../../store/store";
import { UserViewProps } from "../../types/types";

export default function UserView(props: UserViewProps) {
  const { username } = props;
  const [gists, setGists] = useState<any[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const onSuccess = (data: any) => {
    setGists(data);
  };

  const { isLoading: publicUserLoading } = useQuery(
    ["public-user-gists", username],
    () => getUserGists(username),
    {
      enabled: !(user?.username && username === user?.username),
      onSuccess,
    }
  );

  const { isLoading: authUserLoading } = useQuery(
    ["auth-user-gists", username],
    getAuthUserGists,
    {
      enabled: (user?.username && username === user?.username) || false,
      onSuccess,
    }
  );

  const owner: any = gists?.length > 0 && gists[0].owner;

  const openGistDetails = (gist: any) => {
    navigate("/gistdetails", { state: { ...gist } });
  };

  const listGists = () => {
    if (gists && gists?.length > 0) {
      return React.Children.toArray(
        gists.map((item: any) => (
          <UserGist onGistClick={() => openGistDetails(item)} item={item} />
        ))
      );
    } else {
      return <CenterDiv>No gists found!</CenterDiv>;
    }
  };

  return (
    <div>
      <GridContainer>
        <LeftDiv>
          <CenterDiv>
            <Avatar
              src={state?.owner?.avatar_url || owner?.avatar_url}
              sx={{ width: "12em", height: "12em", marginBottom: "1.7em" }}
            />
            <Typography variant="h5">
              {state?.owner?.login || owner.login}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                padding: ".4em 3em",
                textTransform: "none",
                marginTop: "2em",
              }}
            >
              <StyledLink href={state?.owner?.html_url || owner.html_url}>
                View Github Profile
              </StyledLink>
            </Button>
          </CenterDiv>
        </LeftDiv>
        <RightDiv>
          {authUserLoading || publicUserLoading ? <Loader /> : listGists()}
        </RightDiv>
      </GridContainer>
    </div>
  );
}
