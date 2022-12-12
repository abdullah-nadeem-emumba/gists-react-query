import React from "react";

export type UserContextType = {
  user: any;
  setUser: React.Dispatch<any>;
};

export type ButtonProps = {
  text: string;
  customstyle?: "light" | "dark";
  children?: JSX.Element;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export type SearchFieldProps = {
  value: string;
  label: string;
  placeholder: string;
  handleSearchChange?: (e: any) => void;
  handleKeyPress?: (e: Event) => Promise<[]>;
  handleSearch?: (e: any) => void;
};

export type HeaderProps = {
  searchVal: string;
  handleSearchChange?: (e: any) => void;
  handleKeyPress?: (e: any) => Promise<[]>;
  handleSearch?: (e: any) => void;
};

export type GistActionsProps = {
  starred: boolean | undefined;
  toggleStar: (id: string) => any;
  fork: (id: string) => any;
  deleteMyGist?: (id: string) => void;
  editGist?: () => any;
  user: any;
  owner: any;
  id: string;
  showEditDelete?: boolean;
};

export type UserType = {
  token: string;
  username: string;
  url: string;
};

export type UserProfileType = {
  gists: any[];
  loading: boolean;
};

export type LandingScreenProps = {
  emptyScreen?: boolean;
  gists: any[];
  page: number;
  count: number;
  loading: boolean;
  openGistDetails: (gist: any) => void;
  viewType: string;
  setViewType: (type: string) => void;
  handleNextPage: () => void;
  handleChangePage: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
  handleStar: (id: string, setStarred: (starred: boolean) => void) => void;
  handleUnstar: (id: string, setStarred: (starred: boolean) => void) => void;
};

export type RootProps = {
  header: JSX.Element;
  main: JSX.Element;
};

export type TableViewProps = {
  gists: any[];
  onRowClick: (gist: any) => void;
  handleStar: (id: string, setStarred: (starred: boolean) => void) => void;
  handleUnstar: (id: string, setStarred: (starred: boolean) => void) => void;
};

export type UserViewProps = {
  username: string;
};

export type CardViewProps = {
  gists: any[];
  onCardClick: (gist: any) => void;
};

export type GistCardProps = {
  item: any;
  onCardClick: (gist: any) => void;
};

export type UserInfoProps = {
  item: any;
};

export type ToggleViewProps = {
  viewType: string;
  setViewType: (type: string) => void;
};

export type PaginationFooterProps = {
  page: number;
  count: number;
  handleNextPage: () => void;
  handleChangePage: (event: any, newPage: number) => void;
};

export type UserGistProps = {
  item: any;
  onGistClick: (item: any) => void;
};

export type DropMenuProps = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  signout: () => void;
};

export type TableStarProps = {
  id: string;
  handleStar: (id: string, setStarred: (starred: boolean) => void) => void;
  handleUnstar: (id: string, setStarred: (starred: boolean) => void) => void;
};
