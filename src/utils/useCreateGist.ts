import { useMutation } from "react-query";
import { createNewGist, editGist, deleteGist } from "../api/api";

export const useCreateGist = (onSuccess: () => void) => {
  return useMutation(createNewGist, { onSuccess, retry: 0 });
};

export const useEditGist = (onSuccess: () => void) => {
  return useMutation(editGist, {
    onSuccess,
    onError: () => console.log("error"),
    retry: 0,
  });
};

export const useDeleteGist = () => {
  return useMutation(deleteGist);
};
