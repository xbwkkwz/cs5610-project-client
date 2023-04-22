import {createSlice} from "@reduxjs/toolkit";

import {
  createCustomerThunk, 
  findCustomerLoginThunk,
  findCustomerIdThunk, 
  findCustomerCookieThunk,
  findCustomerFollowingThunk, 
  findCustomerFollowerThunk,
  findOtherFollowingThunk,
  findOtherFollowerThunk,
  updateCustomerThunk,
  updateFollowThunk,
  deleteCustomerThunk
} from "../services/customers-thunks";

import {
  createSellerThunk,
  findSellerLoginThunk,
  findSellerIdThunk,
  findSellerCookieThunk,
  updateSellerThunk,
  deleteSellerThunk
} from "../services/sellers-thunks";



// import {} from "../services/sells-thunks";

const initialState = {
  currentUser: null, //ok
  currentFollowing: [], //ok
  currentFollower: [], //ok

  otherUser: null, //ok
  otherFollowing: [], //ok
  otherFollower: [], //ok

  loading: false,
  response: true,
  error: "",
  floading: false,
  fresponse: true,
  ferror: ""
};  

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // reset error response
    resetError(state, action) {
      state.response = true;
      state.error = "";
    },
    // logout
    logout(state, action) {
      state.currentUser = null;
      state.currentFollowing = [];
      state.currentFollower = [];
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
      state.currentFollowing = [];
      state.currentFollower = [];
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
      state.currentFollowing = [];
      state.currentFollower = [];
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
      state.currentFollowing = [];
      state.currentFollower = [];
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
      state.currentFollowing = [];
      state.currentFollower = [];
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

    // view customer self following
    [findCustomerFollowingThunk.pending]:
    (state) => {
      // state.currentFollowing = [];
      state.floading = true;
      state.fresponse = true;
      state.ferror = "";
    },
    [findCustomerFollowingThunk.fulfilled]:
    (state, { payload }) => {
      state.currentFollowing = payload.reverse(); // the order is reversed, newer first
      state.floading = false;
    },
    [findCustomerFollowingThunk.rejected]:
    (state, action) => {
      state.floading = false;
      state.fresponse = false;
      state.ferror = action.error;
    },
    // view customer self follower
    [findCustomerFollowerThunk.pending]:
    (state) => {
      // state.currentFollower = [];
      state.floading = true;
      state.fresponse = true;
      state.ferror = "";
    },
    [findCustomerFollowerThunk.fulfilled]:
    (state, { payload }) => {
      state.currentFollower = payload.reverse(); // the order is reversed, newer first
      state.floading = false;
    },
    [findCustomerFollowerThunk.rejected]:
    (state, action) => {
      state.floading = false;
      state.fresponse = false;
      state.ferror = action.error;
    },

    // view other following
    [findOtherFollowingThunk.pending]:
    (state) => {
      // state.otherFollowing = [];
      state.floading = true;
      state.fresponse = true;
      state.ferror = "";
    },
    [findOtherFollowingThunk.fulfilled]:
    (state, { payload }) => {
      state.otherFollowing = payload.reverse(); // the order is reversed, newer first
      state.floading = false;
    },
    [findOtherFollowingThunk.rejected]:
    (state, action) => {
      state.floading = false;
      state.fresponse = false;
      state.ferror = action.error;
    },
    // view other follower
    [findOtherFollowerThunk.pending]:
    (state) => {
      // state.otherFollower = [];
      state.floading = true;
      state.fresponse = true;
      state.ferror = "";
    },
    [findOtherFollowerThunk.fulfilled]:
    (state, { payload }) => {
      state.otherFollower = payload.reverse(); // the order is reversed, newer first
      state.floading = false;
    },
    [findOtherFollowerThunk.rejected]:
    (state, action) => {
      state.floading = false;
      state.fresponse = false;
      state.ferror = action.error;
    },

    // view other customer profile
    [findCustomerIdThunk.pending]:
    (state) => {
      state.otherUser = null;
      state.otherFollowing = [];
      state.otherFollower = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findCustomerIdThunk.fulfilled]:
    (state, { payload }) => {
      state.otherUser = payload;
      state.loading = false;
    },
    [findCustomerIdThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },
    // view other seller profile
    [findSellerIdThunk.pending]:
    (state) => {
      state.otherUser = null;
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findSellerIdThunk.fulfilled]:
    (state, { payload }) => {
      state.otherUser = payload;
      state.loading = false;
    },
    [findSellerIdThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },

    // save cookie customer
    [findCustomerCookieThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findCustomerCookieThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [findCustomerCookieThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },
    // save cookie seller
    [findSellerCookieThunk.pending]:
    (state) => {
      state.currentUser = null;
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findSellerCookieThunk.fulfilled]:
    (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    [findSellerCookieThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },

    // update current customer profile
    [updateCustomerThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [updateCustomerThunk.fulfilled]:
    (state, { payload }) => { // payload is not a full profile
      state.currentUser = {...state.currentUser, ...payload};
      state.loading = false;
    },
    [updateCustomerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },
    // update current seller profile
    [updateSellerThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [updateSellerThunk.fulfilled]:
    (state, { payload }) => { // payload is not a full profile
      state.currentUser = {...state.currentUser, ...payload};
      state.loading = false;
    },
    [updateSellerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },

    // update following and follower list, A is current user, B is other profile
    // followList >> {"idA": "...", "A": {"following": []}, "idB": "...", "B": {"follower": []}}
    [updateFollowThunk.pending]:
    (state) => {
      state.floading = true;
      state.fresponse = true;
      state.ferror = "";
    },
    [updateFollowThunk.fulfilled]:
    (state, { payload }) => { 
      // // unfollow someone, update the indenpendent following array
      // if (state.currentFollowing.length > payload.A.following) {
      //   // state.currentFollowing = state.currentFollowing.filter(c => payload.A.following.includes(c._id));
      //   console.log("check after filter");
      //   console.log(state.currentFollowing.filter(c => payload.A.following.includes(c._id)));
      //   // state.otherFollower = state.otherFollower.filter(c => payload.B.follower.includes(c._id));
      //   console.log(state.otherFollower.filter(c => payload.B.follower.includes(c._id)));
      // }
      // // follow someone, update the indenpendent follower array
      // else {
      //   state.currentFollowing = [...[state.otherUser], ...state.currentFollowing];
      //   state.otherFollower = [...[state.currentUser], ...state.otherFollower];
      // }
      // console.log("check last");
      // console.log(state.currentFollowing);
      // console.log(state.otherFollower);
      // update array in the user profile
      state.currentUser.following = payload.A.following;
      state.otherUser.follower = payload.B.follower;
      state.floading = false;
    },
    [updateFollowThunk.rejected]:
    (state, action) => {
      state.floading = false;
      state.fresponse = false;
      state.ferror = action.error;
    },
    
    // delete current customer account
    // step 1, delelte reviews
    // step 2, delete follow relationship
    // step 3, delte account id
    [deleteCustomerThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteCustomerThunk.fulfilled]:
    (state, { payload }) => { 
      state.currentUser = null; // equal to logout
      state.loading = false;
    },
    [deleteCustomerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },
    // delete current seller account
    // step 1, delelte sells
    // step 2, delte account id
    [deleteSellerThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteSellerThunk.fulfilled]:
    (state, { payload }) => { 
      state.currentUser = null; // equal to logout
      state.loading = false;
    },
    [deleteSellerThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error;
    },

  },
});
export default slice.reducer;
export const {resetError, logout} = slice.actions;