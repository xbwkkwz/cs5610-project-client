import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cookie from "react-cookies";

import { findCustomerLoginThunk } from "../services/customers-thunks";
import { findSellerLoginThunk } from "../services/sellers-thunks";
import {resetError} from "../reducers/user-reducer";



const LogIn = () => {
  const dispatch = useDispatch();
  
  // load initial data from reducer
  const {currentUser, loading, response, error} = useSelector(state => state.usersData);

  // store search string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  let user = {"email": email, "password": password}
  
  const emailChangeHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const roleChangeHandler = (event) => {
    const value = event.target.value;
    setRole(value);
  };
  
  const LoginClickHandler = () => {
    if (email === "" || password === "") {return}
    if (role === "customer") {
      dispatch(findCustomerLoginThunk(user));
    }
    else {
      dispatch(findSellerLoginThunk(user));
    }
  };

  const backHomeClickHandler = () => {
    dispatch(resetError());
  };


  // add cookie and navigate to page
  const nav = useNavigate();
  useEffect(() => {
    if (currentUser) {
      // for 15 minutes
      const expires = new Date(new Date().getTime() + 15 * 60 * 1000);
      const userInfo = {"_id": currentUser._id, "role": currentUser.role};
      cookie.save("userInfo", userInfo, {path: "/", expires});
      nav("/");
    }
  }, [currentUser, nav]);


  return (
    <div className="d-grid justify-content-center">
      <h3>Login Your OMDb Account</h3>
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
              {!response && (error === "Email does not exist.") && <div className="text-danger">{error}</div>}
            </div>
            <div className="d-grid mb-2">
              <label>Password
              <input className="form-control me-2"
                type="password"
                placeholder="******" 
                onChange={passwordChangeHandler}
              /></label>
              {!response && (error === "Wrong passwords.") && <div className="text-danger">{error}</div>}
            </div>
            <div className="d-grid mb-5">
              <label>Role
              <select className="form-select"
                onChange={roleChangeHandler}>
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
              </label>
            </div>
            {loading && <div>Loading...</div>}
            <div className="d-grid btn btn-outline-primary"
              onClick={LoginClickHandler}
            >Login</div>
          </form>
          <div className="d-flex justify-content-between">
            <Link to="/" className="text-secondary" 
              style={{textDecorationLine:"none"}}
              onClick={backHomeClickHandler}>Back to home page</Link>
            <Link to="/signup" className="text-success" 
              style={{textDecorationLine:"none"}}
              onClick={backHomeClickHandler}>Signup</Link>
          </div>
        </li>
      </div>
    </div>
  );
};
export default LogIn;