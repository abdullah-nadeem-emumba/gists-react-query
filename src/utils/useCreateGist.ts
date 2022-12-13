import { useMutation } from "react-query";
import { createNewGist, editGist, deleteGist } from "../api/api";

export const useCreateGist = () => {
  return useMutation(createNewGist);
};

export const useEditGist = () => {
  return useMutation(editGist);
};

export const useDeleteGist = () => {
  return useMutation(deleteGist);
};
