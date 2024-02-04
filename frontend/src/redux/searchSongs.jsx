import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    name: "Anti-Hero",
    artist: "Taylor Swift",
    image: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    album: "",
    duration: "",
    isLoaded : true,
    rec : []
};

const searchSongs = createReducer(initialState, (builder) => {
  builder.addCase('SELECT_SONG', (state, action) => {
    state.name = action.payload.name;
    state.artist = action.payload.artist;
    state.image = action.payload.image;
    state.album = action.payload.album;
    state.duration = action.payload.duration;
  });
  builder.addCase('RECOMMEND_SONGS', (state, action) => {
    state.rec = action.payload;
  });
});

export default searchSongs;