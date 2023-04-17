import React from "react";
import {useSelector} from "react-redux";

import DetailNav from "./DetailNav";


const DetailMovie = () => {

  // load initial data from reducer
  const {movieDetail, loading, response, error} = useSelector(state => state.moviesData);

  const movie = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div>Title: {movieDetail.Title}</div>
          <div>Year: {movieDetail.Year}</div>
          <div>Rated: {movieDetail.Rated}</div>
          <div>Released: {movieDetail.Released}</div>
          <div>Runtime: {movieDetail.Runtime}</div>
          <div>Genre: {movieDetail.Genre}</div>
          <div>Director: {movieDetail.Director}</div>
          <div>Writer: {movieDetail.Writer}</div>
          <div>Actors: {movieDetail.Actors}</div>
          <div>Plot: {movieDetail.Plot}</div>
        </li>
      </ul>
    );
  };

  return(
    <>
      <div className="mb-2">
      {loading && <div>Loading movie data...</div>}
      {!loading && !response && <div>{error}</div>}
      {!loading && response && movie()}
      </div>
      {/* load navigation here */}
      {!loading && response && <DetailNav imdbID={movieDetail.imdbID}/>}
      {/* load reviews here */}

      {/* load sells here */}

    </>
  );
};
export default DetailMovie;