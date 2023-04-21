import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./reviews-service";
import * as customersService from "./customers-service";
import * as moviesService from "./movies-service";


// input >> {"customerid", "movieid", "content", "rating"=5}
// output >> {full json with _id and time}
export const createReviewThunk = createAsyncThunk(
  'reviews/createReview',
  async (review) => {
    const newReview = await service.create_review(review);
    // step 2, get user details
    let customer = await customersService.find_customer_id(review.customerid);
    customer = {name: customer.name, bio: customer.bio, icon: customer.icon};
    let fullReview = {...newReview, ...customer};
    return fullReview;
  }
);

// could return empty array
export const findMovieReviewsThunk = createAsyncThunk(
  'reviews/findMovieReviews', // unique thunk identifier
  async (imdbID) => {
    // step 1, get review records
    const reviews = await service.find_movie_reviews(imdbID);
    // step 2, get user details
    let fullReviews = [];
    for (let i=0; i<reviews.length; i++) {
      let customer = await customersService.find_customer_id(reviews[i].customerid);
      customer = {name: customer.name, bio: customer.bio, icon: customer.icon};
      fullReviews.push({...reviews[i], ...customer});
    }
    return fullReviews;
  }
);

// could return empty array
export const findCustomerReviewsThunk = createAsyncThunk(
  'reviews/findCustomerReviews', // unique thunk identifier
  async (customerid) => {
    // step 1, get review records
    const reviews = await service.find_customer_reviews(customerid);
    // step 2, get movie details and user details
    let fullReviews = [];
    for (let i=0; i<reviews.length; i++) {
      let movie = await moviesService.search_movie_id(reviews[i].movieid);
      movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
      let customer = await customersService.find_customer_id(reviews[i].customerid);
      customer = {name: customer.name, bio: customer.bio, icon: customer.icon};
      fullReviews.push({...reviews[i], ...movie, ...customer});
    }
    return fullReviews;
  }
);

// could return empty array
export const findOtherReviewsThunk = createAsyncThunk(
  'reviews/findOtherReviews', // unique thunk identifier
  async (customerid) => {
    // step 1, get review records
    const reviews = await service.find_customer_reviews(customerid);
    // step 2, get movie details and customer details
    let fullReviews = [];
    for (let i=0; i<reviews.length; i++) {
      let movie = await moviesService.search_movie_id(reviews[i].movieid);
      movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
      let customer = await customersService.find_customer_id(reviews[i].customerid);
      customer = {name: customer.name, bio: customer.bio, icon: customer.icon};
      fullReviews.push({...reviews[i], ...movie, ...customer});
    }
    return fullReviews;
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
