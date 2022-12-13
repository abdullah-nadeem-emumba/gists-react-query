import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
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
import { RootState, AppDispatch } from "../../store/store";
import { getPublicUserGists, getAuthGists } from "../../slices/profileSlice";
import { UserViewProps } from "../../types/types";

export default function UserView(props: UserViewProps) {
  const { username } = props;
  const [gists, setGists] = useState<any[]>([]);
  //const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  // const { gists, loading } = useSelector(
  //   (state: RootState) => state.userProfile
  // );
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const onSuccess = (data: any) => {
    setGists(data);
  };

  const { data: publicUserGists, isLoading: publicUserLoading } = useQuery(
    ["public-user-gists", username],
    () => getUserGists(username),
    {
      enabled: !(user?.username && username === user?.username),
      onSuccess,
    }
  );

  const { data: authUserGists, isLoading: authUserLoading } = useQuery(
    ["auth-user-gists", username],
    getAuthUserGists,
    {
      enabled: (user?.username && username === user?.username) || false,
      onSuccess,
    }
  );

  const owner: any = gists?.length > 0 && gists[0].owner;

  // useEffect(() => {
  //   getGists();
  // }, []);

  // useEffect(() => {
  //   getGists();
  // }, [username, user?.username]);

  // const getGists = async () => {
  //   if (user?.username && username === user?.username) {
  //     dispatch(getAuthGists());
  //   } else {
  //     dispatch(getPublicUserGists(username));
  //   }
  // };

  // useEffect(() => {
  //   getGists();
  // }, [username, user]);

  // useEffect(() => {
  //   getGists();
  // }, []);

  // const getGists = async () => {
  //   setLoading(true);
  //   if (user && username === user.username) {
  //     const res = await getAuthUserGists();
  //     setGists(res);
  //   } else {
  //     const response = await getUserGists(username);
  //     setGists(response);
  //   }
  //   setLoading(false);
  // };

  const openGistDetails = (gist: any) => {
    navigate("/gistdetails", { state: { ...gist } });
  };

  console.log({ gists });

  const listGists = () => {
    if (gists && gists?.length > 0) {
      return React.Children.toArray(
        gists.map((item: any) => (
          <UserGist onGistClick={() => openGistDetails(item)} item={item} />
        ))
      );
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
