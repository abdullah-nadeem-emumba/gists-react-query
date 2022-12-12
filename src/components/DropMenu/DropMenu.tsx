import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Menu, MenuList, Divider, ListItemText } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { StyledMenuItem, StyledLink, StyledATag } from "./DropMenu.styles";
import { DropMenuProps } from "../../types/types";

export default function DropMenu(props: DropMenuProps) {
  const { open, onClose, anchorEl, signout } = props;
  //const { user } = useContext(UserContext);
  const user = useSelector((state: RootState) => state.user);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{ top: "8%", width: "16em" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuList sx={{ border: "none", padding: "0 1em" }} dense>
        <ListItemText>Signed in as</ListItemText>
        <StyledMenuItem>
          <ListItemText>{user?.username}</ListItemText>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemText>
            <StyledLink to={`/profile/${user?.username}`}>
              Your gists
            </StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText>
            <StyledLink to="/starred">Starred gists</StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText>
            {" "}
            <StyledLink to="/create">Create gist</StyledLink>
          </ListItemText>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemText>
            <StyledATag href={user?.url}>Your github profile</StyledATag>
          </ListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText onClick={signout}>Sign out</ListItemText>
        </StyledMenuItem>
      </MenuList>
    </Menu>
  );
}
