import {createSlice} from "@reduxjs/toolkit";

import {
  createReviewThunk,
  findMovieReviewsThunk,
  findCustomerReviewsThunk,
  findOtherReviewsThunk,
  updateReviewThunk,
  deleteReviewThunk,
  deleteAllReviewsThunk
} from "../services/reviews-thunks";

const initialState = {
  movieReview: [], //ok
  currentReview: [], //ok
  otherReview: [], //ok
  recentReview: [],
  followingReview: [],

  loading: false,
  response: true,
  error: ""
};

const slice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // create one review for one movie
    [createReviewThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [createReviewThunk.fulfilled]:
    (state, { payload }) => {
      state.movieReview.unshift(payload); // the order is reversed, newer first
      state.loading = false;
    },
    [createReviewThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find reviews for one movie
    [findMovieReviewsThunk.pending]:
    (state) => {
      state.movieReview = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findMovieReviewsThunk.fulfilled]:
    (state, { payload }) => {
      state.movieReview = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findMovieReviewsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find reviews for current user
    [findCustomerReviewsThunk.pending]:
    (state) => {
      state.currentReview = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findCustomerReviewsThunk.fulfilled]:
    (state, { payload }) => {
      state.currentReview = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findCustomerReviewsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find reviews for other profile
    [findOtherReviewsThunk.pending]:
    (state) => {
      state.otherReview = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findOtherReviewsThunk.fulfilled]:
    (state, { payload }) => {
      state.otherReview = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findOtherReviewsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // update one review
    [updateReviewThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [updateReviewThunk.fulfilled]:
    (state, { payload }) => {
      let tempReview = state.currentReview.find(r => r._id === payload._id);
      tempReview = {...tempReview, ...payload};
      state.loading = false;
    },
    [updateReviewThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // delete one review
    [deleteReviewThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteReviewThunk.fulfilled]:
    (state, { payload }) => {
      state.currentReview = state.currentReview.filter(r => r._id !== payload);
      state.loading = false;
    },
    [deleteReviewThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // delete all reviews for the user given user id
    [deleteAllReviewsThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteAllReviewsThunk.fulfilled]:
    (state, { payload }) => {
      state.currentReview = [];
      state.followingReview = [];
      state.loading = false;
    },
    [deleteAllReviewsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // get recent 20 reviews across all users





    // get reviews for my followings




  }
});
export default slice.reducer;