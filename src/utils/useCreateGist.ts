import { useMutation } from "react-query";
import { createNewGist, editGist, deleteGist } from "../api/api";

export const useCreateGist = (onSuccess: () => void) => {
  return useMutation(createNewGist, { onSuccess });
};

export const useEditGist = (onSuccess: () => void) => {
  return useMutation(editGist, { onSuccess });
};

export const useDeleteGist = () => {
  return useMutation(deleteGist);
};
