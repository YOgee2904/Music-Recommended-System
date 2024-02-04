import { configureStore } from "@reduxjs/toolkit";

import searchSongs from "./searchSongs";

const store = configureStore({
  reducer: {
    song: searchSongs,
  },
});

export default store;
