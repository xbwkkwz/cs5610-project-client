import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import SearchItem from "../search/SearchItem";

import { getRandomMovies } from "../reducers/movie-reducer";
import { searchRandomIdThunk } from "../services/movies-thunks";



const PopularList = () => {
  const dispatch = useDispatch();

  // load initial user data from reducer
  const {imdbIDArray, randomMovieList, loading, response, error} = useSelector(state => state.moviesData);
  
  // auto load random movies
  // useEffect(() => {dispatch(getRandomMovies())}, [dispatch]);
  useEffect(() => {dispatch(searchRandomIdThunk(imdbIDArray))}, [imdbIDArray, dispatch]);

  const refreshOnClickHandler = () => {
    dispatch(getRandomMovies());
    // use auto render, no need this
    // dispatch(searchRandomIdThunk(imdbIDArray));
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="fs-3 fw-bold">Discover Popular Movies</div>
        <div className="btn fs-4 fw-bold" onClick={refreshOnClickHandler} title="Refresh"><i className="bi bi-arrow-repeat"></i></div>
      </div>
      {loading && <div className="mb-2">Refreshing list...</div>}
      {!loading && !response && <div>{error}</div>}
      <ul className="list-group">
        {response && randomMovieList.map(m => <SearchItem key={m.imdbID} movie={m}/>)}
      </ul>
    </>
  );
};
export default PopularList;