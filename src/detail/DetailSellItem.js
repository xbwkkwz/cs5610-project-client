import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {deleteSellThunk} from "../services/sells-thunks";
// import {searchMovieIdThunk} from "../services/movies-thunks";

const DetailSellItem = ({sell}) => {

  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const active = paths[1];
  
  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  const dispatch = useDispatch();

  // no need to do this, the page will use url address to find movie
  const titleClickHandler = () => {
    // dispatch(searchMovieIdThunk(sell.movieid));
  }

  const deleteClickHandler = () => {
    dispatch(deleteSellThunk(sell._id));
  }

  // check valid poster address
  let posterAddress = "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg";
  posterAddress = (sell.Poster === "N/A") ? posterAddress : sell.Poster;

  return (
    <li className="list-group-item">
      {/* movie part */}
      { (active !== "details") &&
      <div className="d-flex">
        <Link to={`/details/${sell.movieid}/sells`} onClick={titleClickHandler} className="me-3" style={{width: "25%"}}><img className="img-thumbnail" src={posterAddress} alt="Movie Poster"/></Link>
        <div className="">
          <Link to={`/details/${sell.movieid}/sells`} 
            className="text-black fw-bold fs-5" 
            style={{textDecorationLine:"none"}} 
            title={sell.Title} 
            onClick={titleClickHandler}>{sell.Title}
          </Link>
          <div><span className="text-success fw-bold">Year </span>{sell.Year}</div>
          <div><span className="text-success fw-bold">imdbID </span>{sell.movieid}</div>
          <div><span className="text-success fw-bold">Type </span>{sell.Type}</div>
        </div>
      </div>}
      {(active !== "details") && <hr/>}

      {/* name part */}
      <div className="d-flex align-items-center mb-2">
      <Link to={`/profile/seller${(currentUser && currentUser._id === sell.sellerid) ? "/sells" : "/" + sell.sellerid + "/sells"}`}><img className="rounded-circle me-2" width={40} height={40} src={sell.icon} alt="Icon"/></Link>
        <div>
          <Link to={`/profile/seller${(currentUser && currentUser._id === sell.sellerid) ? "/sells" : "/" + sell.sellerid + "/sells"}`} style={{textDecorationLine:"none"}} className="text-black fw-bold me-1">{sell.name}</Link>
          <span className="text-secondary">· {sell.time.slice(0, 10)}</span>
        </div>
      </div>

      {/* center content */}
      <ul className="list-group mb-2">
        <li className="list-group-item"><span className="text-success fw-bold me-3">{sell.format}</span>${sell.price}</li>
      </ul>
      
      {/* button part */}
      {(paths.length < 2) && currentUser && (currentUser._id === sell.sellerid) && <div className="float-end">
        <Link to={`/edit/sell/${sell._id}`} style={{textDecorationLine:"none"}} className="btn btn-outline-warning me-4" title="Edit this sell"><i className="bi bi-pencil-square"></i> Edit</Link>
        <span className="btn btn-outline-danger" onClick={deleteClickHandler} title="Delete this sell"><i className="bi bi-x-square"></i> Delete</span>
      </div>}
    </li>
  );
};
export default DetailSellItem;