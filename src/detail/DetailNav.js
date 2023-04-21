import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

// for movie details page
import {findMovieReviewsThunk} from "../services/reviews-thunks";
import {findMovieSellsThunk} from "../services/sells-thunks";

// for profile customer
import { findCustomerReviewsThunk } from "../services/reviews-thunks";
import { findCustomerFollowingThunk } from "../services/customers-thunks";
import { findCustomerFollowerThunk } from "../services/customers-thunks";

import { findOtherReviewsThunk } from "../services/reviews-thunks";
import { findOtherFollowingThunk } from "../services/customers-thunks";
import { findOtherFollowerThunk } from "../services/customers-thunks";

// for profile seller
import { findSellerSellsThunk } from "../services/sells-thunks";
import { findOtherSellsThunk } from "../services/sells-thunks";


const DetailNav = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;
  // /details/movidid/reviews
  // /details/movidid/sells
  // /profile/customer/reviews or followings or followers, 4
  // /profile/customer/customerid/reviews or followings or followers, 5
  // /profile/seller/sells
  // /profile/seller/sellerid/sells
  const movieid = paths[2];
  const detailTab = paths[3];

  const userid = paths[3];
  const profileTab = paths[4];

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  

  const dispatch = useDispatch();

  const movieReviewClickHandler = () => {
    //pass in movie id
    dispatch(findMovieReviewsThunk(movieid)); 
  }

  const movieSellClickHandler = () => {
    //pass in movie id
    dispatch(findMovieSellsThunk(movieid)); 
  }

  // for visiting self customer
  const currentReviewClickHandler = () => {
    // pass customer id
    dispatch(findCustomerReviewsThunk(currentUser._id));
  }

  const currentFollowingClickHandler = () => {
    // pass customer id
    dispatch(findCustomerFollowingThunk(currentUser._id));
  }

  const currentFollowerClickHandler = () => {
    // pass customer id
    dispatch(findCustomerFollowerThunk(currentUser._id));
  }

  // for visiting other customer
  const otherReviewClickHandler = () => {
    // pass customer id
    dispatch(findOtherReviewsThunk(userid));
  }

  const otherFollowingClickHandler = () => {
    // pass customer id
    dispatch(findOtherFollowingThunk(userid));
  }

  const otherFollowerClickHandler = () => {
    // pass customer id
    dispatch(findOtherFollowerThunk(userid));
  }

  // for visiting self seller
  const currentSellClickHandler = () => {
    // pass customer id
    dispatch(findSellerSellsThunk(currentUser._id));
  }

  // for visiting other seller
  const otherSellClickHandler = () => {
    // pass customer id
    dispatch(findOtherSellsThunk(userid));
  }


  return (
    <ul className="nav nav-tabs mb-2">
      {/* for movie detail nav */}
      {paths[1] === "details" && <>
      <li className="nav-item">
        <Link to={`/details/${movieid}/reviews`} 
          className={`nav-link ${detailTab === 'reviews' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={movieReviewClickHandler}>Reviews</Link>
      </li>
      <li className="nav-item">
        <Link to={`/details/${movieid}/sells`} 
          className={`nav-link ${detailTab === 'sells' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={movieSellClickHandler}>Sells</Link>
      </li></>}

      {/* for customer self profile nav */}
      {paths[1] === "profile" && paths[2] === "customer" && pathsLength === 4 &&<>
      <li className="nav-item">
        <Link to={`/profile/customer/reviews`} 
          className={`nav-link ${paths[3] === 'reviews' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={currentReviewClickHandler}>Reviews</Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/customer/followings`} 
          className={`nav-link ${paths[3] === 'followings' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={currentFollowingClickHandler}>Followings</Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/customer/followers`} 
          className={`nav-link ${paths[3] === 'followers' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={currentFollowerClickHandler}>Followers</Link>
      </li></>}

      {/* for customer other profile nav */}
      {paths[1] === "profile" && paths[2] === "customer" && pathsLength === 5 &&<>
      <li className="nav-item">
        <Link to={`/profile/customer/${userid}/reviews`} 
          className={`nav-link ${profileTab === 'reviews' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={otherReviewClickHandler}>Reviews</Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/customer/${userid}/followings`} 
          className={`nav-link ${profileTab === 'followings' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={otherFollowingClickHandler}>Followings</Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/customer/${userid}/followers`} 
          className={`nav-link ${profileTab === 'followers' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={otherFollowerClickHandler}>Followers</Link>
      </li></>}

      {/* for self profile seller nav */}
      {paths[1] === "profile" && paths[2] === "seller" && pathsLength === 4 &&<>
      <li className="nav-item">
        <Link to={`/profile/seller/sells`} 
          className={`nav-link ${paths[3] === 'sells' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={currentSellClickHandler}>Sells</Link>
      </li></>}

      {/* for other profile seller nav */}
      {paths[1] === "profile" && paths[2] === "seller" && pathsLength === 5 &&<>
      <li className="nav-item">
        <Link to={`/profile/seller/${userid}/sells`} 
          className={`nav-link ${profileTab === 'sells' ? 'active fw-bold text-primary' : 'text-black'}`}
          onClick={otherSellClickHandler}>Sells</Link>
      </li></>}

      {/* for popular movies */}

      {/* for following reviews */}

    </ul>
  );
};
export default DetailNav;