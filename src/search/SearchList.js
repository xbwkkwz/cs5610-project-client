import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import SearchItem from "./SearchItem";
import {searchMovieTitleThunk} from "../services/movies-thunks";

const SearchList = () => {
  const dispatch = useDispatch();

  // load initial data from reducer
  const {movieList, loading, response, error} = useSelector(state => state.moviesData);
  
  // store search string
  const [search, setSearch] = useState('');

  const searchChangeHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  
  const searchClickHandler = () => {
    dispatch(searchMovieTitleThunk(search));
  };
  
  return(
    <>
      <div className="position-relative">
        <input placeholder="Search Movies" 
          className="form-control rounded-pill ps-5"
          onChange={() => {searchChangeHandler()}}
        />
        <i className="bi bi-search"
          onClick={() => {searchClickHandler()}}
        ></i>
      </div>

      {loading && <div>Searching...</div>}
      {!loading && !response && <div>{error}</div>}
      <ul className="list-group">
        {!loading && response && movieList.map(m => <SearchItem key={m.imdbID} movie={m}/>)}
      </ul>
    </>
  );
};
export default SearchList;