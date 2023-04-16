import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./reviews-service";


// input >> {"customerid", "movieid", "content", "rating"=5}
// output >> {full json with _id and time}
export const createReviewThunk = createAsyncThunk(
  'reviews/createReview',
  async (review) => {
    const newReview = await service.create_review(review);
    return newReview;
  }
);

// could return empty array
export const findMovieReviewsThunk = createAsyncThunk(
  'reviews/findMovieReviews', // unique thunk identifier
  async (imdbID) => {
    const reviews = await service.find_movie_reviews(imdbID);
    return reviews;
  }
);

// could return empty array
export const findCustomerReviewsThunk = createAsyncThunk(
  'reviews/findCustomerReviews', // unique thunk identifier
  async (customerid) => {
    const reviews = await service.find_customer_reviews(customerid);
    return reviews;
  }
);

// input >> {"_id", "content", "rating"}
// return the input again
export const updateReviewThunk = createAsyncThunk(
  'reviews/updateReview',
  async (review) => {
    await service.update_review(review);
    return review;
  }
);

// return the input again
export const deleteReviewThunk = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    await service.delete_review(reviewId);
    return reviewId;
  }
);

// could return enpty array, no need to delete
export const deleteAllReviewsThunk = createAsyncThunk(
  'reviews/deleteAllReviews',
  async (customerId) => {
    await service.delete_all_reviews(customerId);
    return customerId;
  }
);
