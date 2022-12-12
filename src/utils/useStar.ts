import { useMutation } from "react-query";
import { starGist, unStarGist } from "../api/api";

export const useStarGist = () => {
  return useMutation(starGist);
};

export const useUnStarGist = () => {
  return useMutation(unStarGist);
};
