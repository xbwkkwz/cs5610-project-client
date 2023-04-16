import axios from 'axios';

// REACT_APP_API_MONGO = 'http://localhost:4000';
// remote server = 'https://tuiter-node-server-app-i8h6.onrender.com/'; // need to change
const MONGO_API = process.env.REACT_APP_API_MONGO;


// internal API for sellers
// -------------------------------------


// create one seller
// input >> {"email", "password", "name"}
export const create_seller = async (seller) => {
  const response = await axios.post(`${MONGO_API}/sellers`, seller);
  // response is new seller >> {"_id", "email", "password", "name", "bio", ...more}
  // or error
  return response.data;
}

// login by email and password
// input >> {"email", "password"}
export const find_seller_login = async (email, password) => {
  const response = await axios.get(`${MONGO_API}/sellers?email=${email}&password=${password}`);
  // response is seller >> {"_id", "email", "password", "name", "bio", ...more}
  // or error
  return response.data;
}

// find seller by its id
export const find_seller_id = async (sellerId) => {
  const response = await axios.get(`${MONGO_API}/sellers/${sellerId}`);
  // response is seller >> {"_id", "email", "password", "name", "bio", ...more}
  return response.data;
}

// edit one seller info
// input >> {"_id", "password", "name", "bio", "address", "website", "businesshour"}
export const update_seller = async (seller) => {
  const response = await axios.put(`${MONGO_API}/sellers/${seller._id}`, seller);
  // response is 200, not used
  return response.data;
}

// delete one seller
export const delete_seller = async (sellerId) => {
  const response = await axios.delete(`${MONGO_API}/sellers/${sellerId}`);
  // response is 200
  return response.data;
}

