import axios from "axios";
import { createGistType, editGistType } from "../types/types";
import { getUserFromStorage, returnFiles } from "../utils/utils";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const getConfig = () => {
  const user = getUserFromStorage();
  const config = {
    headers: { authorization: `token ${user?.token}` },
  };

  return config;
};

export const getPublicGists = async (per_page: number, page: number) => {
  const response = await api.get(
    `/gists/public?per_page=${per_page}&page=${page}`,
    getConfig()
  );
  console.log(response);
  const data = response.data;
  if (data.length > 0) {
    return data;
  }
  return [];
};

export const getGistContent = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const isGistStarred = async (gistID: string) => {
  try {
    const response = await api.get(`/gists/${gistID}/star`, getConfig());
    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const deleteGist = async (gistID: string) => {
  const response = await api.delete(`/gists/${gistID}`, getConfig());
  if (response.status === 204) return true;
  return false;
};

export const starGist = async (gistID: string) => {
  const response = await api.put(
    `/gists/${gistID}/star`,
    {
      gist_id: gistID,
    },
    getConfig()
  );
  return response.status === 204 ? true : false;
};

export const unStarGist = async (gistID: string) => {
  const response = await api.delete(`/gists/${gistID}/star`, getConfig());
  //console.log({ response });

  return response.status === 204 ? true : false;
};

export const forkGist = async (gistID: string) => {
  const response = await api.post(`/gists/${gistID}/forks`, getConfig());
  console.log(response);
  return response;
};

export const getSearchedGists = async (
  username: string,
  per_page: number,
  page: number
) => {
  console.log("username", username);

  try {
    const response = await api.get(
      `/users/${username}/gists?per_page=${per_page}&page=${page}`
    );
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getUserGists = async (username: string | undefined) => {
  try {
    const response = await api.get(`/users/${username}/gists`);
    console.log("username res", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createNewGist = async ({
  description,
  files,
  controller,
}: createGistType) => {
  const data = {
    description,
    public: true,
    files: returnFiles(files),
  };
  const response = await api.post("/gists", data, {
    signal: controller.signal,
    ...getConfig(),
  });
  console.log("create gist", response);
  if (response.status === 201) {
    return true;
  }
};

export const editGist = async ({
  id,
  description,
  files,
  controller,
}: editGistType) => {
  console.log({ files });

  const data = {
    gist_id: id,
    description,
    files: returnFiles(files),
  };
  const response = await api.patch(`/gists/${id}`, data, {
    signal: controller.signal,
    ...getConfig(),
  });
  console.log(response);
  if (response.status === 200) return true;
};

export const getStarredGists = async (per_page: number, page: number) => {
  const response = await api.get(
    `/gists/starred?per_page=${per_page}&page=${page}`,
    getConfig()
  );
  console.log(response);
  if (response.status === 200) return response.data;
  else {
    return [];
  }
};

export const getAuthUserGists = async () => {
  try {
    const response = await api.get("/gists", getConfig());
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
