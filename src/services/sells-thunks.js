import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./sells-service";


// input >> {"sellerid", "movieid", "price", "format"="Digital"}
// output >> {full json with _id}
export const createSellThunk = createAsyncThunk(
  'sells/createSell',
  async (sell) => {
    const newSell = await service.create_sell(sell);
    return newSell;
  }
);

// could return empty array
export const findMovieSellsThunk = createAsyncThunk(
  'sells/findMovieSells', // unique thunk identifier
  async (imdbID) => {
    const sells = await service.find_movie_sells(imdbID);
    return sells;
  }
);

// could return empty array
export const findSellerSellsThunk = createAsyncThunk(
  'sells/findSellerSells', // unique thunk identifier
  async (sellerId) => {
    const sells = await service.find_seller_sells(sellerId);
    return sells;
  }
);

// input >> {"_id", "price"}
// return the input again
export const updateSellThunk = createAsyncThunk(
  'sells/updateSell',
  async (sell) => {
    await service.update_sell(sell);
    return sell;
  }
);

// return the input again
export const deleteSellThunk = createAsyncThunk(
  'sells/deleteSell',
  async (sellId) => {
    await service.delete_sell(sellId);
    return sellId;
  }
);

// could return enpty array, no need to delete
export const deleteAllSellsThunk = createAsyncThunk(
  'sells/deleteAllSells',
  async (sellerId) => {
    await service.delete_all_sells(sellerId);
    return sellerId;
  }
);
