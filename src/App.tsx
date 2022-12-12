import React, { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/global";
import UserProfile from "./screens/UserProfileScreen/UserProfile";
import GistScreen from "./screens/GistScreen/GistScreen";
import CreateGist from "./screens/CreateGistScreen/CreateGist";
import Home from "./screens/HomeScreen/Home";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import StarredGistsScreen from "./screens/StarredGistsScreen/StarredGistsScreen";
import { UserContext } from "./contexts/UserContext";
import { getUserFromStorage } from "./utils/utils";
import Protected from "./components/ProtectedRoute/Protected";

export default function App() {
  const [user, setUser] = useState(getUserFromStorage());
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <GlobalStyles />
      <UserContext.Provider value={providerValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route
            path="/create"
            element={<Protected Component={CreateGist} />}
          />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/gistdetails" element={<GistScreen />} />
          <Route
            path="/starred"
            element={<Protected Component={StarredGistsScreen} />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
