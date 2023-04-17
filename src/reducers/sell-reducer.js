import {createSlice} from "@reduxjs/toolkit";

import {
  createSellThunk,
  findMovieSellsThunk,
  findSellerSellsThunk,
  findOtherSellsThunk,
  updateSellThunk,
  deleteSellThunk,
  deleteAllSellsThunk
} from "../services/sells-thunks";

const initialState = {
  movieSell: [],
  currentSell: [],
  otherSell: [],

  loading: false,
  response: true,
  error: ""
};

const slice = createSlice({
  name: 'sell',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // create one sell for one movie
    [createSellThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [createSellThunk.fulfilled]:
    (state, { payload }) => {
      state.movieSell.unshift(payload); // the order is reversed, newer first
      state.loading = false;
    },
    [createSellThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find sells for one movie
    [findMovieSellsThunk.pending]:
    (state) => {
      state.movieSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findMovieSellsThunk.fulfilled]:
    (state, { payload }) => {
      state.movieSell = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findMovieSellsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find sells for current user
    [findSellerSellsThunk.pending]:
    (state) => {
      state.currentSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findSellerSellsThunk.fulfilled]:
    (state, { payload }) => {
      state.currentSell = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findSellerSellsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // find sells for other profile
    [findOtherSellsThunk.pending]:
    (state) => {
      state.otherSell = [];
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [findOtherSellsThunk.fulfilled]:
    (state, { payload }) => {
      state.otherSell = payload.reverse(); // the order is reversed, newer first
      state.loading = false;
    },
    [findOtherSellsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // update one sell
    [updateSellThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [updateSellThunk.fulfilled]:
    (state, { payload }) => {
      let tempSell = state.currentSell.find(s => s._id === payload._id);
      tempSell = {...tempSell, ...payload};
      state.loading = false;
    },
    [updateSellThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // delete one sell
    [deleteSellThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteSellThunk.fulfilled]:
    (state, { payload }) => {
      state.currentSell = state.currentSell.filter(s => s._id !== payload);
      state.loading = false;
    },
    [deleteSellThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },

    // delete all sells for the user given user id
    [deleteAllSellsThunk.pending]:
    (state) => {
      state.loading = true;
      state.response = true;
      state.error = "";
    },
    [deleteAllSellsThunk.fulfilled]:
    (state, { payload }) => {
      state.currentSell = [];
      state.loading = false;
    },
    [deleteAllSellsThunk.rejected]:
    (state, action) => {
      state.loading = false;
      state.response = false;
      state.error = action.error; // action: {payload, error, ...}
    },
  }
});
export default slice.reducer;