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
    if (search === "") {return}
    dispatch(searchMovieTitleThunk(search));
  };
  
  return(
    <>
      <form className="d-flex mb-2">
        <input className="form-control me-2"
          type="search"
          placeholder="Search movie, series, episode" 
          onChange={searchChangeHandler}
        />
        <div className="btn btn-outline-primary"
          onClick={searchClickHandler}
        >Search</div>
      </form>

      {loading && <div className="mb-2">Searching...</div>}
      {!loading && !response && <div>{error}</div>}
      <ul className="list-group">
        {response && movieList.map(m => <SearchItem key={m.imdbID} movie={m}/>)}
      </ul>
    </>
  );
};
export default SearchList;