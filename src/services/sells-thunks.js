import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./sells-service";
import * as sellersService from "./sellers-service";
import * as moviesService from "./movies-service";


// input >> {"sellerid", "movieid", "price", "format"="Digital"}
// output >> {full json with _id}
export const createSellThunk = createAsyncThunk(
  'sells/createSell',
  async (sell) => {
    const newSell = await service.create_sell(sell);
    // step 2, get user details
    let movie = await moviesService.search_movie_id(sell.movieid);
    movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
    let seller = await sellersService.find_seller_id(sell.sellerid);
    seller = {name: seller.name, bio: seller.bio, icon: seller.icon};
    let fullSell = {...newSell, ...movie, ...seller};
    return fullSell;
  }
);

// could return empty array
export const findMovieSellsThunk = createAsyncThunk(
  'sells/findMovieSells', // unique thunk identifier
  async (imdbID) => {
    // step 1, get sell records
    const sells = await service.find_movie_sells(imdbID);
    // step 2, get user details
    let fullSells = [];
    for (let i=0; i<sells.length; i++) {
      let movie = await moviesService.search_movie_id(sells[i].movieid);
      movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
      let seller = await sellersService.find_seller_id(sells[i].sellerid);
      seller = {name: seller.name, bio: seller.bio, icon: seller.icon};
      fullSells.push({...sells[i], ...movie, ...seller});
    }
    return fullSells;
  }
);

// could return empty array
export const findSellerSellsThunk = createAsyncThunk(
  'sells/findSellerSells', // unique thunk identifier
  async (sellerId) => {
    // step 1, get sell records
    const sells = await service.find_seller_sells(sellerId);
    // step 2, get movie details
    let fullSells = [];
    for (let i=0; i<sells.length; i++) {
      let movie = await moviesService.search_movie_id(sells[i].movieid);
      movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
      let seller = await sellersService.find_seller_id(sells[i].sellerid);
      seller = {name: seller.name, bio: seller.bio, icon: seller.icon};
      fullSells.push({...sells[i], ...movie, ...seller});
    }
    return fullSells;
  }
);

// could return empty array
export const findOtherSellsThunk = createAsyncThunk(
  'sells/findOtherSells', // unique thunk identifier
  async (sellerId) => {
    // step 1, get sell records
    const sells = await service.find_seller_sells(sellerId);
    // step 2, get movie details
    let fullSells = [];
    for (let i=0; i<sells.length; i++) {
      let movie = await moviesService.search_movie_id(sells[i].movieid);
      movie = {Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster};
      let seller = await sellersService.find_seller_id(sells[i].sellerid);
      seller = {name: seller.name, bio: seller.bio, icon: seller.icon};
      fullSells.push({...sells[i], ...movie, ...seller});
    }
    return fullSells;
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
