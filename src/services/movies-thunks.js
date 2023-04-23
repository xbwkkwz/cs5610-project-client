import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./movies-service";


// input is title string
// the search string is encode already
// could return enpty array
export const searchMovieTitleThunk = createAsyncThunk(
  'movies/searchTitle', // unique thunk identifier
  async (title) => {
    const movies = await service.search_movie_title(title);
    return movies;
  }
);

// return one movie json
export const searchMovieIdThunk = createAsyncThunk(
  'movies/searchId', // unique thunk identifier
  async (imdbID) => {
    const movie = await service.search_movie_id(imdbID);
    return movie;
  }
);

// return random movie list
export const searchRandomIdThunk = createAsyncThunk(
  'movies/searchRandom', // unique thunk identifier
  async (imdbIDArray) => {
    let randomMovieList = [];
    for (let i=0; i<imdbIDArray.length; i++) {
      const movie = await service.search_movie_id(imdbIDArray[i]);
      randomMovieList.push(movie);
    }
    return randomMovieList;
  }
);