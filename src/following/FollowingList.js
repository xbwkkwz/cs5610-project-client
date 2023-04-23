import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";

import DetailReviewItem from "../detail/DetailReviewItem";
import DetailSellItem from "../detail/DetailSellItem";

import { findFollowingReviewsThunk, findReviewByTimeThunk } from "../services/reviews-thunks";
import { findSellByTimeThunk } from "../services/sells-thunks";



const FollowingList = () => {
  const dispatch = useDispatch();
  // const nav = useNavigate();

  // load initial user data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  const {followingReview, recentReview, loading, response, error} = useSelector(state => state.reviewsData);
  const {recentSell} = useSelector(state => state.sellsData);
  
  // auto load following people's reviews
  useEffect(() => {
    if (!currentUser) {
      dispatch(findReviewByTimeThunk());
    }
    else if (currentUser.role === "customer") {
      dispatch(findFollowingReviewsThunk(currentUser.following));
    }
    else {
      dispatch(findSellByTimeThunk());
    }
  }, [currentUser, dispatch]);

  const refreshOnClickHandler = () => {
    if (!currentUser) {
      dispatch(findReviewByTimeThunk());
    }
    else if (currentUser.role === "customer") {
      dispatch(findFollowingReviewsThunk(currentUser.following));
    }
    else {
      dispatch(findSellByTimeThunk());
    }
  };

  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";

  // redirect to home page
  // useEffect(() => {
  //   if (!currentUser) nav("/");
  // });
  
  return (
    <>
      <div className="d-flex justify-content-between">
        {!currentUser && <div className="fs-3 fw-bold">Discover Recent Reviews</div>}
        {currentUser && currentUser.role === "customer" && <div className="fs-3 fw-bold">Following Reviews</div>}
        {currentUser && currentUser.role === "seller" && <div className="fs-3 fw-bold">Recent Sells</div>}
        <div className="btn fs-4 fw-bold" onClick={refreshOnClickHandler} title="Refresh"><i className="bi bi-arrow-repeat"></i></div>
      </div>
      {loading && <div className="mb-2">Refreshing list...</div>}
      {!loading && !response && <div>{error}</div>}
      {currentUser && currentUser.role === "customer" && !loading && followingReview.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      <ul className="list-group">
        {!currentUser && response && recentReview.map(r => <DetailReviewItem key={r._id} review={r}/>)}
        {currentUser && currentUser.role === "customer" && response && followingReview.map(r => <DetailReviewItem key={r._id} review={r}/>)}
        {currentUser && currentUser.role === "seller" && response && recentSell.map(s => <DetailSellItem key={s._id} sell={s}/>)}
      </ul>
    </>
  );
};
export default FollowingList;