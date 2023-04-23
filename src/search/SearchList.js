import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";

import {searchMovieTitleThunk} from "../services/movies-thunks";

import SearchItem from "./SearchItem";


const SearchList = () => {
  // find path info, /search/xxxxxxx
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  let titleStr = "";
  if (paths.length === 3) {
    titleStr = paths[2]; // need the title string
  }
  
  // auto search from url string
  const dispatch = useDispatch();
  useEffect(() => {
    if (titleStr !== "") {
      dispatch(searchMovieTitleThunk(titleStr));
    }}, [titleStr, dispatch]
    );

  // load initial data from reducer
  const {movieList, loading, response, error} = useSelector(state => state.moviesData);
  
  // store search string from user
  const [search, setSearch] = useState('');
  
  // save to search when user type
  const searchChangeHandler = (event) => {
    const value = event.target.value.trim();
    // encodeURI(str);
    setSearch(value);
  };
  
  // const searchClickHandler = () => {
  //   if (search === "") {return}
  //   dispatch(searchMovieTitleThunk(search));
  // };
  
  return(
    <>
      <form className="d-flex mb-2">
        <input className="form-control me-2"
          type="search"
          placeholder="Search movie, series, episode"
          onChange={searchChangeHandler}
        />
        <Link to={`/search/${search}`} className="btn btn-outline-primary"
          // onClick={searchClickHandler}
        >Search</Link>
      </form>

      {loading && <div className="mb-2">Searching...</div>}
      {!loading && !response && <div>{error}</div>}
      <ul className="list-group">
        {response && movieList && movieList.map(m => <SearchItem key={m.imdbID} movie={m}/>)}
      </ul>
    </>
  );
};
export default SearchList;