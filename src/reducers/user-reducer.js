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
  error: false
};  

const slice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    // logout
    logout(state, action) {
      state.currentUser = null,
      state.loading = false,
      state.error = ""
    },
  }, 
  extraReducers: {
    // sign up
    [createCustomerThunk.pending]:
    (state) => {
      state.loading = true;
      state.currentUser = null;
    },
    [createCustomerThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [createCustomerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.error = action.error; // action: {payload, error, ...}
    },
    // login 
    [findCustomerLoginThunk.pending]:
    (state) => {
      state.loading = true;
      state.currentUser = null;
    },
    [findCustomerLoginThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    },
    [findCustomerLoginThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.error = action.error;
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




    [deleteTuitThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      state.tuits = state.tuits.filter(t => t._id !== payload);
    },
    [createTuitThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      // state.tuits.push(payload);
      state.tuits.unshift(payload);
    },
    [updateTuitThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      const tuit = state.tuits.find(tuit => tuit._id === payload._id);
      tuit.liked = !tuit.liked;
      tuit.likes = (tuit.liked === true) ? tuit.likes + 1 : tuit.likes - 1;
    },
    [dislikeTuitThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false;
      const tuit = state.tuits.find(tuit => tuit._id === payload._id);
      tuit.disliked = !tuit.disliked;
      tuit.dislikes = (tuit.disliked === true) ? tuit.dislikes + 1 : tuit.dislikes - 1;
    }
  },
});
export default slice.reducer;
export const {logout} = userSlice.actions;