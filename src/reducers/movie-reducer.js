import {createSlice} from "@reduxjs/toolkit";
import {
  searchMovieTitleThunk, 
  searchMovieIdThunk,
} from "../services/movies-thunks";


const initialState = {
  movieList: [],
  movieDetail: {},

  loading: false,
  response: true,
  error: ""
};

const slice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {}, 
  extraReducers: {
    // search by title
    [searchMovieTitleThunk.pending]:
    (state) => {
      state.movieList = [];
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
      state.error = action.error; // action: {payload, error, ...}
    },
  }
});
export default slice.reducer;
