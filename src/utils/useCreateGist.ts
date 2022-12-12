import { useMutation } from "react-query";
import { createNewGist, editGist } from "../api/api";

export const useCreateGist = () => {
  return useMutation(createNewGist);
};

export const useEditGist = () => {
  return useMutation(editGist);
};
