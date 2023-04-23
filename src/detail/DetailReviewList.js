import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

import DetailReviewItem from "./DetailReviewItem";
import {createReviewThunk} from "../services/reviews-thunks";


const DetailReviewList = ({imdbID}) => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;

  const dispatch = useDispatch();

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  const {movieReview, currentReview, otherReview, loading, response} = useSelector(state => state.reviewsData);
  
  // store string
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  let review = {};
  if (currentUser) {
    review = {"customerid": currentUser._id, "movieid": imdbID, "content": content, "rating": rating};
  } 

  let reviewArray = [];
  if (imdbID.length !== 0) {
    reviewArray = movieReview;
  }
  else if (imdbID.length === 0 && pathsLength === 4) {
    reviewArray = currentReview;
  }
  else {
    reviewArray = otherReview;
  }
  
  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";

  const contentChangeHandler = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const ratingChangeHandler = (event) => {
    const value = event.target.value;
    setRating(value);
  };
  
  const reviewClickHandler = () => {
    if (content === "") {return}
    dispatch(createReviewThunk(review));
  };
  
  const addReview = () => {
    return (
      <div className="list-group mb-2">
        <li className="list-group-item">
          <form>
            <textarea className="form-control mb-2"
              rows={5}
              type="text"
              placeholder="Create your review!" 
              value={content}
              onChange={contentChangeHandler}
            ></textarea>
            {/* second part */}
            <div className="d-flex">
              <label className="d-flex"><span className="text-success fw-bold me-2">Rating</span>
                <select defaultValue={5} className="form-select"
                  onChange={ratingChangeHandler}>
                  <option value={1}>1/5</option>
                  <option value={2}>2/5</option>
                  <option value={3}>3/5</option>
                  <option value={4}>4/5</option>
                  <option value={5}>5/5</option>
                </select>
              </label>
              <div className="btn btn-outline-primary ms-auto"
                onClick={reviewClickHandler}
              ><i className="bi bi-card-text"></i> Create</div>
            </div>
          </form>
        </li>
      </div>
    );
  };

  return(
    <> 
      {(imdbID.length !== 0) && currentUser && (currentUser.role === "customer") && addReview()}
      {loading && <div className="mb-2">Loading reviews...</div>}
      {!loading && reviewArray.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      
      <ul className="list-group">
        {response && reviewArray.map(r => <DetailReviewItem key={r._id} review={r}/>)}
      </ul>
    </>
  );
};
export default DetailReviewList;