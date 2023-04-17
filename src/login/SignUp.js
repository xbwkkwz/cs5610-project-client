import React, {useState} from "react";
import {Link, redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { createCustomerThunk } from "../services/customers-thunks";
import { createSellerThunk } from "../services/sellers-thunks";
import {resetError} from "../reducers/user-reducer";


const SignUp = () => {
  const dispatch = useDispatch();
  
  // load initial data from reducer
  const {currentUser, loading, response, error} = useSelector(state => state.usersData);

  // store search string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState("customer");
  const user = {"email": email, "password": password, "name": name, "role": role}

  const emailChangeHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const nameChangeHandler = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const roleChangeHandler = (event) => {
    const value = event.target.value;
    setRole(value);
  };
  
  const createUserHandler = () => {
    if (email === "" || password === "" || name === "") {return}
    if (role === "customer") {
      dispatch(createCustomerThunk(user));
    }
    else {
      dispatch(createSellerThunk(user));
    }
  };

  const backHomeClickHandler = () => {
    dispatch(resetError());
  };

  return (
    <div className="d-grid justify-content-center">
    <h3>Create Your OMDb Account</h3>
    <div className="list-group">
      <li className="list-group-item">
        <form className="mb-2">
          <div className="d-grid mb-2">
            <label>Email
            <input className="form-control me-2"
              type="email"
              placeholder="email@domain.com" 
              onChange={emailChangeHandler}
            /></label>
          </div>
          {!response && <div className="text-danger">{error}</div>}
          <div className="d-grid mb-2">
            <label>Password
            <input className="form-control me-2"
              type="password"
              placeholder="******" 
              onChange={passwordChangeHandler}
            /></label>
          </div>
          <div className="d-grid mb-2">
            <label>Name
            <input className="form-control me-2"
              type="text"
              placeholder="display name" 
              onChange={nameChangeHandler}
            /></label>
          </div>
          <div className="d-grid mb-5">
            <label>Role
            <select className="form-select"
              onChange={roleChangeHandler}>
              <option defaultValue="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
            </label>
          </div>
          {loading && <div>Loading...</div>}
          <div className="d-grid btn btn-outline-success"
            onClick={createUserHandler}
          >Create Account</div>
        </form>

        <Link to="/" className="text-secondary" 
          style={{textDecorationLine:"none"}}
          onClick={backHomeClickHandler}>Back to home page</Link>
      </li>
    </div>
    {/* {currentUser && redirect("/")} */}
    </div>
  );
};
export default SignUp;