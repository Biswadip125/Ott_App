import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    backdropImages: null,
    profileMenuToggle: false,
    watchlist: [],
    menuToggle: false,
  },
  reducers: {
    //action
    getNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    getBackdropImages: (state, action) => {
      state.backdropImages = action.payload;
    },
    setProfileMenuToggle: (state) => {
      state.profileMenuToggle = !state.profileMenuToggle;
    },
    setWatchlist: (state, action) => {
      state.watchlist = [...action.payload];
    },
    setMenuToggle: (state) => {
      state.menuToggle = !state.menuToggle;
    },
  },
});

export const {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getBackdropImages,
  setProfileMenuToggle,
  setWatchlist,
  setMenuToggle,
} = movieSlice.actions;

export default movieSlice.reducer;
