import { useMutation, useQueries, useQuery } from "react-query";
import { starGist, unStarGist } from "../api/api";
import { isGistStarred } from "../api/api";

export const useStarGist = () => {
  return useMutation(starGist);
};

export const useUnStarGist = () => {
  return useMutation(unStarGist);
};

export const useIsStarred = (gistID: string) => {
  return useQuery("is-gist-starred", () => isGistStarred(gistID));
};
