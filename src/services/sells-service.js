import axios from 'axios';

// REACT_APP_API_MONGO = 'http://localhost:4000';
// remote server = 'https://tuiter-node-server-app-i8h6.onrender.com/'; // need to change
const MONGO_API = process.env.REACT_APP_API_MONGO;


// internal API for sells
// -------------------------------------


// create one sell from one seller
// input >> {"sellerid", "movieid", "price", "format"="Digital"}
export const create_sell = async (sell) => {
  const response = await axios.post(`${MONGO_API}/sells`, sell);
  // response is new sell >> {"_id", "sellerid", "movieid", "price", "format"}
  return response.data;
}

// seller cannot sell same movie multiple times!!!!!!!!!


// get sells for one movie
// response is json lists, or empty []
export const find_movie_sells = async (movieId) => {
  const response = await axios.get(`${MONGO_API}/sells/movie/${movieId}`);
  return response.data;
}

// get sells for one seller
// response is json lists, or empty []
export const find_seller_sells = async (sellerId) => {
  const response = await axios.get(`${MONGO_API}/sells/seller/${sellerId}`);
  return response.data;
}

// get recent 10 sells
// response is array or empty
export const find_sell_by_time = async () => {
  const response = await axios.get(`${MONGO_API}/sells/recent`);
  return response.data;
};

// edit one sell for one seller
// input >> {"_id", "price"}
export const update_sell = async (sell) => {
  const response = await axios.put(`${MONGO_API}/sells/${sell._id}`, sell);
  // response is 200
  return response.data;
}

// delete one sell for one seller
export const delete_sell = async (sellId) => {
  const response = await axios.delete(`${MONGO_API}/sells/${sellId}`);
  // response is 200
  return response.data;
}

// delete all sells for one seller
export const delete_all_sells = async (sellerId) => {
  const response = await axios.delete(`${MONGO_API}/sells/seller/${sellerId}`);
  // response is 200
  return response.data;
}