import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, Routes, Route} from "react-router";

import {searchMovieIdThunk} from "../services/movies-thunks";
import {findMovieReviewsThunk} from "../services/reviews-thunks";
import {findMovieSellsThunk} from "../services/sells-thunks";

import DetailNav from "./DetailNav";
import DetailReviewList from "./DetailReviewList";
import DetailSellList from "./DetailSellList";


const DetailMovie = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const movieid = paths[2]; // need the movie id

  // auto load data
  const dispatch = useDispatch();
  useEffect(() => {dispatch(searchMovieIdThunk(movieid))}, [movieid, dispatch]);
  useEffect(() => {dispatch(findMovieReviewsThunk(movieid))}, [movieid, dispatch]);
  useEffect(() => {dispatch(findMovieSellsThunk(movieid))}, [movieid, dispatch]);

  // load initial data from reducer
  const {movieDetail, loading, response, error} = useSelector(state => state.moviesData);
  
  // check valid poster address
  let posterAddress = "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg";
  posterAddress = (movieDetail.Poster === "N/A") ? posterAddress : movieDetail.Poster;

  // go back to visit history
  const nav = useNavigate();
  const backClickHandler = () => {
    nav(-1);
  }

  const content = () => {
    return (
      <>
        {/* {movieDetail.Title !== "N/A" && <div><span className="fw-bold text-success">Title </span>{movieDetail.Title}</div>} */}
        {movieDetail.Year !== "N/A" && <div><span className="fw-bold text-success">Year </span>{movieDetail.Year}</div>}
        {movieDetail.Rated !== "N/A" && <div><span className="fw-bold text-success">Rated </span>{movieDetail.Rated}</div>}
        {movieDetail.Released !== "N/A" && <div><span className="fw-bold text-success">Released </span>{movieDetail.Released}</div>}
        {movieDetail.Runtime !== "N/A" && <div><span className="fw-bold text-success">Runtime </span>{movieDetail.Runtime}</div>}
        {movieDetail.Genre !== "N/A" && <div><span className="fw-bold text-success">Genre </span>{movieDetail.Genre}</div>}
        {movieDetail.Director !== "N/A" && <div><span className="fw-bold text-success">Director </span>{movieDetail.Director}</div>}
        {movieDetail.Writer !== "N/A" && <div><span className="fw-bold text-success">Writer </span>{movieDetail.Writer}</div>}
        {movieDetail.Actors !== "N/A" && <div><span className="fw-bold text-success">Actors </span>{movieDetail.Actors}</div>}
        {movieDetail.Language !== "N/A" && <div><span className="fw-bold text-success">Language </span>{movieDetail.Language}</div>}
        {movieDetail.Country !== "N/A" && <div><span className="fw-bold text-success">Country </span>{movieDetail.Country}</div>}
        {movieDetail.Awards !== "N/A" && <div><span className="fw-bold text-success">Awards </span>{movieDetail.Awards}</div>}
        {"Ratings" in movieDetail && movieDetail.Ratings.length !== 0 && <div className="d-flex"><span className="fw-bold text-success me-1">Ratings</span>
          <div>{movieDetail.Ratings.map((r, index) => <div key={index}>{r.Source}: {r.Value}</div>)}</div>
        </div>}
        {movieDetail.Metascore !== "N/A" && <div><span className="fw-bold text-success">Metascore </span>{movieDetail.Metascore}</div>}
        {movieDetail.imdbRating !== "N/A" && <div><span className="fw-bold text-success">imdbRating </span>{movieDetail.imdbRating}</div>}
        {movieDetail.imdbVotes !== "N/A" && <div><span className="fw-bold text-success">imdbVotes </span>{movieDetail.imdbVotes}</div>}
        {movieDetail.imdbID !== "N/A" && <div><span className="fw-bold text-success">imdbID </span>{movieDetail.imdbID}</div>}
        {movieDetail.Type !== "N/A" && <div><span className="fw-bold text-success">Type </span>{movieDetail.Type}</div>}
        {"DVD" in movieDetail && movieDetail.DVD !== "N/A" && <div><span className="fw-bold text-success">DVD </span>{movieDetail.DVD}</div>}
        {"BoxOffice" in movieDetail && movieDetail.BoxOffice !== "N/A" && <div><span className="fw-bold text-success">BoxOffice </span>{movieDetail.BoxOffice}</div>}
        {"Production" in movieDetail && movieDetail.Production !== "N/A" && <div><span className="fw-bold text-success">Production </span>{movieDetail.Production}</div>}
        {"Website" in movieDetail && movieDetail.Website !== "N/A" && <div><span className="fw-bold text-success">Website </span>{movieDetail.Website}</div>}  
      </>
    );
  };

  const movie = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="btn" onClick={backClickHandler} title="Back to last page"><i className="bi bi-backspace"></i> Back</div>
          <h3 className="fw-bold text-black">{movieDetail.Title}</h3>
          <div className="row">
            <div className="col-3"><img className="img-thumbnail" src={posterAddress} alt="Movie Poster"/></div>
            <ul className="list-group col-9">
              <li className="list-group-item">
                {content()}
              </li>
            </ul>
          </div>
          <div>
            {movieDetail.Plot !== "N/A" && <hr/>}
            {movieDetail.Plot !== "N/A" && <div className="d-flex"><span className="fw-bold text-success me-1">Plot </span><div>{movieDetail.Plot}</div></div>}
          </div>
        </li>
      </ul>
    );
  };

  return (
    <>
    {/* load movie info here */}
      <div className="mb-2">
        {loading && <div>Loading...</div>}
        {!loading && !response && <div>{error}</div>}
        {movieDetail && !loading && response && movie()}
      </div>
      {/* load navigation here */}
      {!loading && response && <DetailNav/>}
      {/* load review or sell tab */}
      <Routes>
        <Route path={`${movieDetail.imdbID}/reviews`} element={!loading && response && <DetailReviewList imdbID={movieDetail.imdbID}/>}/>
        <Route path={`${movieDetail.imdbID}/sells`} element={!loading && response && <DetailSellList imdbID={movieDetail.imdbID}/>}/>
      </Routes>
    </>
  );
};
export default DetailMovie;