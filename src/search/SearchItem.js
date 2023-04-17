import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {searchMovieIdThunk} from "../services/movies-thunks";

const SearchItem = (
  {movie}
) => {
  const dispatch = useDispatch();

  const titleClickHandler = (imdbID) => {
    dispatch(searchMovieIdThunk(imdbID));
  }

  // check valid poster address
  let posterAddress = (movie.Poster === "N/A") ? "./posters/default-poster.jpg" : movie.Poster;

  return (
    <li className="list-group-item">
      <Link to={`/details/${movie.imdbID}`} 
        className="text-priamry" 
        style={{textDecorationLine:"none"}} 
        title={movie.Title} 
        onClick={() => titleClickHandler(movie.imdbID)}>
        {movie.Title}
      </Link>
      <div>Year: {movie.Year}</div>
      <div>imdbID: {movie.imdbID}</div>
      <div>Type: {movie.Type}</div>
      <img className="" width={48} src={posterAddress} alt="Movie Poster"/>
    </li>
  );
};
export default SearchItem;