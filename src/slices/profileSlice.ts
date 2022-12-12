import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileType } from "../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserGists, getAuthUserGists } from "../api/api";

const initialState: UserProfileType = {
  gists: [],
  loading: false,
};

export const getPublicUserGists = createAsyncThunk(
  "userProfile/getPublicUserGists",
  async (username: string, thunkAPI) => {
    const res = await getUserGists(username);
    return res;
  }
);

export const getAuthGists = createAsyncThunk(
  "userProfile/getAuthUserGists",
  async () => {
    const res = await getAuthUserGists();
    return res;
  }
);

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    // getUserData: (state, action: PayloadAction) => {},
    // getAuthUserData: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getPublicUserGists.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPublicUserGists.fulfilled, (state, action) => {
      state.loading = false;
      state.gists = action.payload;
    });
    builder.addCase(getAuthGists.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAuthGists.fulfilled, (state, action) => {
      state.loading = false;
      state.gists = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { getUserData, getAuthUserData } = profileSlice.actions;

export default profileSlice.reducer;
