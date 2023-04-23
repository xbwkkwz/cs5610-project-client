import React, {useState} from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { updateReviewThunk } from "../services/reviews-thunks";


const EditReview = () => {

  const dispatch = useDispatch();
  const nav = useNavigate();

  // // find path info, /edit/review/id
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const reviewId = paths[3];
  
  // load initial user data from reducer
  const {movieReview, currentReview} = useSelector(state => state.reviewsData);
  const reviews = [...movieReview, ...currentReview];
  const review = reviews.find(r => r._id === reviewId);
  

  // go back to last page after save
  const backClickHandler = () => {
    nav(-1);
  }

  // load origional data
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);

  // change content
  const contentChangeHandler = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  // change rating
  const ratingChangeHandler = (event) => {
    const value = event.target.value;
    setRating(value);
  };

  // save change and exit
  const saveClickHandler = () => {
    if (content === "") {
      alert("Review cannot be empty!");
      return;
    }
    let newReview = {"_id": review._id, "content": content, "rating": rating};
    dispatch(updateReviewThunk(newReview));
    backClickHandler();
  };

  // cancel change
  const cancelClickHandler = () => {
    backClickHandler();
  };



  return (
    <ul className="list-group">
      <li className="list-group-item">
        {/* edit part */}
        <form>
          {/* content */}
          <div className="mb-3">
            <label htmlFor="edit_content" className="form-label fw-bold">Content</label>
            <textarea rows={5} className="form-control" id="edit_content" aria-describedby="contentHelp" placeholder={review.content} value={content} onChange={contentChangeHandler}></textarea>
            <div id="contentHelp" className="form-text">Tell me what you think.</div>
          </div>
          {/* rating */}
          <div className="mb-3">
            <label htmlFor="edit_rating" className="form-label fw-bold">Rating</label>
            <select defaultValue={review.rating} className="form-select" id="edit_rating" aria-describedby="ratingHelp" onChange={ratingChangeHandler}>
              <option value={1}>1/5</option>
              <option value={2}>2/5</option>
              <option value={3}>3/5</option>
              <option value={4}>4/5</option>
              <option value={5}>5/5</option>
            </select>
            <div id="ratingHelp" className="form-text">Rate your review.</div>
          </div>
          {/* button */}
          <div className="btn btn-outline-primary me-2" title="Save changes" onClick={saveClickHandler}><i className="bi bi-check-square"></i> Save</div>
          <div className="btn btn-outline-success" title="Cancel changes" onClick={cancelClickHandler}><i className="bi bi-x-square"></i> Cancel</div>
        </form>
      </li>
    </ul>
  );
};
export default EditReview;