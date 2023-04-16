import axios from 'axios';

// REACT_APP_API_MONGO = 'http://localhost:4000';
// remote server = 'https://tuiter-node-server-app-i8h6.onrender.com/'; // need to change
const MONGO_API = process.env.REACT_APP_API_MONGO;


// internal API for customers
// -------------------------------------


// create one customer
// input >> {"email", "password", "name"}
export const create_customer = async (customer) => {
  const response = await axios.post(`${MONGO_API}/customers`, customer);
  // response is new customer >> {"_id", "email", "password", "name", "bio", ...more}
  // or error
  return response.data;
}

// login by email and password
// input >> {"email", "password"}
export const find_customer_login = async (email, password) => {
  const response = await axios.get(`${MONGO_API}/customers?email=${email}&password=${password}`);
  // response is customer >> {"_id", "email", "password", "name", "bio", ...more}
  // or error
  return response.data;
}

// find customer by its id
export const find_customer_id = async (customerId) => {
  const response = await axios.get(`${MONGO_API}/customers/${customerId}`);
  // response is customer >> {"_id", "email", "password", "name", "bio", ...more}
  return response.data;
}

// find followings for the customer
export const find_customer_following = async (customerId) => {
  const response = await axios.get(`${MONGO_API}/customers/following/${customerId}`);
  // response is array of whole customers >> [{"_id", "email", "password", "name", "bio", ...more}, {}]
  // or empty array
  return response.data;
}

// find followers for the customer
export const find_customer_follower = async (customerId) => {
  const response = await axios.get(`${MONGO_API}/customers/follower/${customerId}`);
  // response is array of whole customers >> [{"_id", "email", "password", "name", "bio", ...more}, {}]
  // or empty array
  return response.data;
}

// edit one customer info
// input >> {"_id", "password", "name", "bio"}
export const update_customer = async (customer) => {
  const response = await axios.put(`${MONGO_API}/customers/${customer._id}`, customer);
  // response is 200, not used
  return response.data;
}

// follow or unfollow one customer
// followList >> {"idA": "...", "A": [], "idB": "...", "B": []}
export const update_follow = async (followList) => {
  const response = await axios.put(`${MONGO_API}/customers/follow/${followList.idA}/${followList.idB}`, followList);
  // response is 200, not used
  return response.data;
}

// delete one customer
export const delete_customer = async (customerId) => {
  const response = await axios.delete(`${MONGO_API}/customers/${customerId}`);
  // response is 200
  return response.data;
}

