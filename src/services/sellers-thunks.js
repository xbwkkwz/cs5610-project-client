import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./sellers-service";


// input >> {"email", "password", "name"}
// output >> {full json with _id} or error json
export const createSellerThunk = createAsyncThunk(
  'sellers/createSeller',
  async (seller) => {
    const newSeller = await service.create_seller(seller);
    return newSeller;
  }
);

// login for seller
// output >> {full json with _id} or error json
export const findSellerLoginThunk = createAsyncThunk(
  'sellers/findSellerLogin',
  async (email, password) => {
    const seller = await service.find_seller_login(email, password);
    return seller;
  }
);

// review one seller profile
// output >> {full json with _id} or error json
export const findSellerIdThunk = createAsyncThunk(
  'sellers/findSellerId',
  async (sellerId) => {
    const seller = await service.find_seller_id(sellerId);
    return seller;
  }
);

// update info for the seller
// return input again
export const updateSellerThunk = createAsyncThunk(
  'sellers/updateSeller',
  async (seller) => {
    await service.update_seller(seller);
    return seller;
  }
);

// delete one seller
// return input again
export const deleteSellerThunk = createAsyncThunk(
  'sellers/deleteSeller',
  async (sellerId) => {
    await service.delete_seller(sellerId);
    return sellerId;
  }
);

