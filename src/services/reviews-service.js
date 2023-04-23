import axios from 'axios';

// REACT_APP_API_MONGO = 'http://localhost:4000';
// remote server = 'https://tuiter-node-server-app-i8h6.onrender.com/'; // need to change
const MONGO_API = process.env.REACT_APP_API_MONGO;


// internal API for reviews
// -------------------------------------


// create one review for one customer
// input >> {"customerid", "movieid", "content", "rating"=5}
export const create_review = async (review) => {
  const response = await axios.post(`${MONGO_API}/reviews`, review);
  // response is new review >> {"_id", "customerid", "movieid", "content", "time", "rating"}
  return response.data;
}

// get one review from its id
// response is one review
export const find_review_by_id = async (reviewId) => {
  const response = await axios.get(`${MONGO_API}/reviews/${reviewId}`);
  return response.data;
};

// get reviews for one movie
// response is json lists, can empty
export const find_movie_reviews = async (imdbID) => {
  // const response = await axios.get(`${MONGO_API}/reviews/movie/${imdbID}`);
  // /details/tt0053604/reviews
  const response = await axios.get(`${MONGO_API}/details/${imdbID}/reviews`);
  return response.data;
}

// get reviews for one customer
// response is json lists, can empty
export const find_customer_reviews = async (customerId) => {
  const response = await axios.get(`${MONGO_API}/reviews/customer/${customerId}`);
  return response.data;
}

// get reviews for my following
// response is json lists, can empty
export const find_following_reviews = async (customeridArray) => {
  const idArrayStr = (customeridArray.length === 0) ? "," : customeridArray.join(',');
  const response = await axios.get(`${MONGO_API}/reviews/customerFollowing/${idArrayStr}`);
  return response.data;
}

// edit one review for one customer
// input >> {"_id", "content", "rating"}
export const update_review = async (review) => {
  const response = await axios.put(`${MONGO_API}/reviews/${review._id}`, review);
  // response is 200
  return response.data;
}

// delete one review for one customer
export const delete_review = async (reviewId) => {
  const response = await axios.delete(`${MONGO_API}/reviews/${reviewId}`);
  // response is 200
  return response.data;
}

// delete all reviews for one customer
export const delete_all_reviews = async (customerId) => {
  const response = await axios.delete(`${MONGO_API}/reviews/customer/${customerId}`);
  // response is 200
  return response.data;
}

