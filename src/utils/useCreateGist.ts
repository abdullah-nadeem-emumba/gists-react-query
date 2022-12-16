import { useMutation } from "react-query";
import { createNewGist, editGist, deleteGist } from "../api/api";

export const useCreateGist = (onSuccess: () => void) => {
  return useMutation(createNewGist, {
    onSuccess,
    onError: () => alert("Something went wrong! Please try again"),
    retry: 0,
  });
};

export const useEditGist = (onSuccess: () => void) => {
  return useMutation(editGist, {
    onSuccess,
    onError: () => alert("Something went wrong! Please try again"),
    retry: 0,
  });
};

export const useDeleteGist = (onSuccess: () => void) => {
  return useMutation(deleteGist, {
    onSuccess,
    onError: () => alert("Something went wrong! Please try again"),
  });
};
