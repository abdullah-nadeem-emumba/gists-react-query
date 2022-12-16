import { useMutation } from "react-query";
import { starGist, unStarGist } from "../api/api";

export const useStarGist = () => {
  return useMutation(starGist, {
    onError: () => alert("Something went wrong! Please try again"),
  });
};

export const useUnStarGist = () => {
  return useMutation(unStarGist, {
    onError: () => alert("Something went wrong! Please try again"),
  });
};

export const useStarSelected = (
  checkedRows: string[],
  onSuccess: () => void
) => {
  const starSelectedGists = async () => {
    const result = await Promise.allSettled(
      checkedRows.map(async (gistID: string) => {
        try {
          return starGist(gistID);
        } catch (error) {
          console.log(error);
        }
      })
    );
    return result;
  };

  return useMutation(starSelectedGists, {
    onSuccess,
    onError: () => alert("Something went wrong! Please try again"),
  });
};

export const useUnstarSelected = (
  checkedRows: string[],
  onSuccess: () => void
) => {
  const unStarSelectedGists = async () => {
    const result = await Promise.allSettled(
      checkedRows.map(async (gistID: string) => {
        try {
          return unStarGist(gistID);
        } catch (error) {
          console.log(error);
        }
      })
    );
    return result;
  };

  return useMutation(unStarSelectedGists, {
    onSuccess,
    onError: () => alert("Something went wrong! Please try again"),
  });
};
