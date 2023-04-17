import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./customers-service";


// input >> {"email", "password", "name", "role"}
// output >> {full json with _id} or error json
export const createCustomerThunk = createAsyncThunk(
  'customers/createCustomer',
  async (customer) => {
    const newCustomer = await service.create_customer(customer);
    return newCustomer;
  }
);

// login for customer
// output >> {full json with _id} or error json
export const findCustomerLoginThunk = createAsyncThunk(
  'customers/findCustomerLogin',
  async (user) => {
    const customer = await service.find_customer_login(user);
    return customer;
  }
);

// review one customer profile
// output >> {full json with _id} or error json
export const findCustomerIdThunk = createAsyncThunk(
  'customers/findCustomerId',
  async (customerId) => {
    const customer = await service.find_customer_id(customerId);
    return customer;
  }
);

// find followings for the customer
// output >> array of people json or empty []
export const findCustomerFollowingThunk = createAsyncThunk(
  'customers/findCustomerFollowing',
  async (customerId) => {
    const customers = await service.find_customer_following(customerId);
    return customers;
  }
);

// find followers for the customer
// output >> array of people json or empty []
export const findCustomerFollowerThunk = createAsyncThunk(
  'customers/findCustomerFollower',
  async (customerId) => {
    const customers = await service.find_customer_follower(customerId);
    return customers;
  }
);

// find followings for other profiles
// output >> array of people json or empty []
export const findOtherFollowingThunk = createAsyncThunk(
  'customers/findOtherFollowing',
  async (customerId) => {
    const customers = await service.find_customer_following(customerId);
    return customers;
  }
);

// find followers for other profiles
// output >> array of people json or empty []
export const findOtherFollowerThunk = createAsyncThunk(
  'customers/findOtherFollower',
  async (customerId) => {
    const customers = await service.find_customer_follower(customerId);
    return customers;
  }
);

// update info for the customer
// return input again
export const updateCustomerThunk = createAsyncThunk(
  'customers/updateCustomer',
  async (customer) => {
    await service.update_customer(customer);
    return customer;
  }
);

// update following and follower
// followList >> {"idA": "...", "A": [], "idB": "...", "B": []}
// return input again
export const updateFollowThunk = createAsyncThunk(
  'customers/updateFollow',
  async (followList) => {
    await service.update_follow(followList);
    return followList;
  }
);

// delete one customer
// return input again
export const deleteCustomerThunk = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId) => {
    await service.delete_customer(customerId);
    return customerId;
  }
);

