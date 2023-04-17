import {createSlice} from "@reduxjs/toolkit";
import {
  createCustomerThunk, 
  findCustomerLoginThunk,
  findCustomerIdThunk, 
  findCustomerFollowingThunk, 
  findCustomerFollowerThunk,
  updateCustomerThunk,
  updateFollowThunk,
  deleteCustomerThunk
} from "../services/customers-thunks";

import {
  createSellerThunk,
  findSellerLoginThunk,
  findSellerIdThunk,
  updateSellerThunk,
  deleteSellerThunk
} from "../services/sellers-thunks";


const initialState = {
  currentUser: null,
  currentReview: [],
  currentFollowing: [],
  currentFollower: [],
  currentSell: [],

  otherUser: null,
  otherReview: [],
  otherFollowing: [],
  otherFollower: [],
  otherSell: [],

  loading: false,
  response: true,
  error: ""
};  

const slice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    // reset response
    resetError(state, action) {
      state.response = true;
      state.error = "";
    },
    // logout
    logout(state, action) {
      state.currentUser = null;
      state.loading = false;
      state.response = true;
      state.error = "";
    },
  }, 
  extraReducers: {
    // sign up
    [createCustomerThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.currentReview = [];
      state.currentFollowing = [];
      state.currentFollower = [];
      state.currentSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [createCustomerThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [createCustomerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = "Email exists."; // action: {payload, error, ...}
    },
    [createSellerThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.currentReview = [];
      state.currentFollowing = [];
      state.currentFollower = [];
      state.currentSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [createSellerThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [createSellerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = "Email exists."; // action: {payload, error, ...}
    },
    // login 
    [findCustomerLoginThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.currentReview = [];
      state.currentFollowing = [];
      state.currentFollower = [];
      state.currentSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findCustomerLoginThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [findCustomerLoginThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      let message = action.error.message;
      let length = message.length;
      if (message.slice(length-3, length+1) === "400") {
        state.error = "Email does not exist.";
      }
      else {
        state.error = "Wrong passwords.";
      }
    },
    [findSellerLoginThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.currentReview = [];
      state.currentFollowing = [];
      state.currentFollower = [];
      state.currentSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findSellerLoginThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [findSellerLoginThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      let message = action.error.message;
      let length = message.length;
      if (message.slice(length-3, length+1) === "400") {
        state.error = "Email does not exist.";
      }
      else {
        state.error = "Wrong passwords.";
      }
    },




    // view customer profile
    [findCustomerIdThunk.pending]:
    (state) => {
      state.loading = true;
      state.currentUser = null;
    },
    [findCustomerIdThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [findCustomerIdThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.error = action.error;
    },




    
  },
});
export default slice.reducer;
export const {resetError, logout} = slice.actions;