import axios from 'axios';


// external API for movie data
// ---------------------------

const OMDB_API = "https://www.omdbapi.com/?apikey=5675ff02";

// search all movies from external api
// the search string is encode already
// response is a json with 3 fields {"Search":[], "totalResults":"2", "Response":"True"}
// or no data >> {"Response":"False", "Error":"Movie not found!"}
export const search_movie_title = async (title) => {
  // const str = encodeURI(title.trim());
  const response = await axios.get(`${OMDB_API}&s=${title}`);
  return response.data;
}

// search one movie from external api
// A valid IMDb ID (e.g. tt1285016)
// response is a json with 25 fields
// or no data >> {"Response":"False","Error":"Incorrect IMDb ID."}
export const search_movie_id = async (imdbID) => {
  const response = await axios.get(`${OMDB_API}&i=${imdbID}&plot=full`);
  return response.data;
}