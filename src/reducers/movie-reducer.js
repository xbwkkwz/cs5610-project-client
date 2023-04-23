import {createSlice} from "@reduxjs/toolkit";
import {
  searchMovieTitleThunk, 
  searchMovieIdThunk,
  searchRandomIdThunk,
} from "../services/movies-thunks";

import top_250_movies from "./top_250_movies.json";

// shuffle array algorithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const initialState = {
  movieList: [],
  movieDetail: {},

  imdbIDArray: shuffle(top_250_movies).slice(0,10),
  randomMovieList: [],

  loading: false,
  response: true,
  error: ""
};

const slice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    // get random movies from top 250 list
    getRandomMovies(state, action) {
      const randomArray = shuffle(top_250_movies).slice(0,10);
      state.imdbIDArray = randomArray;
    }
  }, 
  extraReducers: {
    // search by title
    [searchMovieTitleThunk.pending]:
    (state) => {
      // state.movieList = [];
      state.movieDetail = {};
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [searchMovieTitleThunk.fulfilled]:
    (state, { payload }) => {
      state.movieList = payload.Search;
      state.loading = false;
      state.response = (payload.Response === "True") ? true : false;
      state.error = (payload.Response === "True") ? "" : payload.Error;
    },
    [searchMovieTitleThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },
    // search by imdb number
    [searchMovieIdThunk.pending]:
    (state) => {
      state.movieDetail = {};
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [searchMovieIdThunk.fulfilled]:
    (state, { payload }) => {
      state.movieDetail = payload;
      state.loading = false;
      state.response = (payload.Response === "True") ? true : false;
      state.error = (payload.Response === "True") ? "" : payload.Error;
    },
    [searchMovieIdThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },
    // search by imdb number array
    [searchRandomIdThunk.pending]:
    (state) => {
      // state.randomMovieList = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [searchRandomIdThunk.fulfilled]:
    (state, { payload }) => {
      state.randomMovieList = payload;
      state.loading = false;
      state.response = true;
      state.error = "";
    },
    [searchRandomIdThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },
  }
});
export default slice.reducer;
export const {getRandomMovies} = slice.actions;
