import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

// import { findReviewByIdThunk } from "../services/reviews-thunks";
import { deleteReviewThunk } from "../services/reviews-thunks";
import { searchMovieIdThunk } from "../services/movies-thunks";

const DetailReviewItem = ({review}) => {

  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const active = paths[1];
  
  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  const dispatch = useDispatch();

  const titleClickHandler = () => {
    dispatch(searchMovieIdThunk(review.movieid));
  }

  // const editClickHandler = () => {
  //   dispatch(findReviewByIdThunk(review._id));
  // };

  const deleteClickHandler = () => {
    dispatch(deleteReviewThunk(review._id));
  }

  // check valid poster address
  let posterAddress = "https://templatelab.com/wp-content/uploads/2019/06/movie-poster-template-03.jpg";
  posterAddress = (review.Poster === "N/A") ? posterAddress : review.Poster;

  return (
    <li className="list-group-item">
      {/* movie part */}
      { (active !== "details") &&
      <div className="d-flex">
        <div className="me-3" style={{width: "25%"}}><img className="img-thumbnail" src={posterAddress} alt="Movie Poster"/></div>
        <div>
          <Link to={`/details/${review.movieid}/reviews`} 
            className="text-black fw-bold fs-5" 
            style={{textDecorationLine:"none"}} 
            title={review.Title} 
            onClick={titleClickHandler}>
            {review.Title}
          </Link>
          <div><span className="text-success fw-bold">Year </span>{review.Year}</div>
          <div><span className="text-success fw-bold">imdbID </span>{review.movieid}</div>
          <div><span className="text-success fw-bold">Type </span>{review.Type}</div>
        </div>
      </div>}
      {(active !== "details") && <hr/>}

      {/* name part */}
      <div className="d-flex align-items-center mb-2">
        <img className="rounded-circle me-2" width={40} height={40} src={review.icon} alt="Icon"/>
        <div>
          <Link to={`/profile/customer/${(currentUser && currentUser._id === review.customerid) ? "reviews" : review.customerid + "/reviews"}`} style={{textDecorationLine:"none"}} className="text-black fw-bold me-1">{review.name}</Link>
          <span className="text-secondary">· {review.time.slice(0, 10)}</span>
        </div>
        <div className="ms-auto"><i className="bi bi-star-half text-success fs-4 me-2"></i><span className="fs-5 fw-bold">{review.rating}</span><span className="text-secondary">/5</span></div>
      </div>

      {/* center content */}
      <ul className="list-group mb-2">
        <li className="list-group-item">{review.content}</li>
      </ul>

      {/* button part */}
      {currentUser && (currentUser._id === review.customerid) && <div className="float-end">
        <Link to={`/edit/review/${review._id}`} style={{textDecorationLine:"none"}} className="btn btn-outline-warning me-4" title="Edit this review"><i className="bi bi-pencil-square"></i> Edit</Link>
        <span className="btn btn-outline-danger" onClick={deleteClickHandler} title="Delete this review"><i className="bi bi-x-square"></i> Delete</span>
      </div>}
    </li>
  );
};
export default DetailReviewItem;