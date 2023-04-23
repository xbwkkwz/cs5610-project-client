import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import DetailReviewItem from "../detail/DetailReviewItem";

import { findFollowingReviewsThunk } from "../services/reviews-thunks";



const FollowingList = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // load initial user data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  const {followingReview, loading, response, error} = useSelector(state => state.reviewsData);
  
  // auto load following people's reviews
  useEffect(() => {currentUser && dispatch(findFollowingReviewsThunk(currentUser.following))}, [currentUser, dispatch]);

  const refreshOnClickHandler = () => {
    dispatch(findFollowingReviewsThunk(currentUser.following));
  };

  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";

  // redirect to home page
  useEffect(() => {
    if (!currentUser) nav("/");
  });
  
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="fs-3 fw-bold">Following reviews</div>
        <div className="btn fs-4 fw-bold" onClick={refreshOnClickHandler} title="Refresh"><i className="bi bi-arrow-repeat"></i></div>
      </div>
      {loading && <div className="mb-2">Refreshing list...</div>}
      {!loading && !response && <div>{error}</div>}
      {!loading && followingReview.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      <ul className="list-group">
        {response && followingReview.map(r => <DetailReviewItem key={r._id} review={r}/>)}
      </ul>
    </>
  );
};
export default FollowingList;