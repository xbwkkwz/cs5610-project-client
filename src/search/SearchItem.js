import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {searchMovieIdThunk} from "../services/movies-thunks";
import {findMovieReviewsThunk} from "../services/reviews-thunks";

const SearchItem = ({movie}) => {
  const dispatch = useDispatch();

  const titleClickHandler = () => {
    // dispatch(searchMovieIdThunk(movie.imdbID));
    // dispatch(findMovieReviewsThunk(movie.imdbID));
  }

  // check valid poster address
  let posterAddress = "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg";
  posterAddress = (movie.Poster === "N/A") ? posterAddress : movie.Poster;

  return (
    <li className="list-group-item">
      <div className="d-flex">
        <img className="img-fluid img-thumbnail w-25 me-3" src={posterAddress} alt="Movie Poster"/>
        <div>
          <Link to={`/details/${movie.imdbID}/reviews`} 
            className="text-black fw-bold fs-5" 
            style={{textDecorationLine:"none"}} 
            title={movie.Title} 
            onClick={titleClickHandler}>
            {movie.Title}
          </Link>
          <div><span className="text-success fw-bold">Year </span>{movie.Year}</div>
          <div><span className="text-success fw-bold">imdbID </span>{movie.imdbID}</div>
          <div><span className="text-success fw-bold">Type </span>{movie.Type}</div>
        </div>
      </div>
    </li>
  );
};
export default SearchItem;