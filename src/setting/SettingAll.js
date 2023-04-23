import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cookie from "react-cookies";

import { deleteAllReviewsThunk } from "../services/reviews-thunks";
import { deleteCustomerThunk } from "../services/customers-thunks";

import { deleteAllSellsThunk } from "../services/sells-thunks";
import { deleteSellerThunk } from "../services/sellers-thunks";

import {logout} from "../reducers/user-reducer";


const SettingAll = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // load initial user data from reducer
  const {currentUser} = useSelector(state => state.usersData);

  // store search string
  const [understand, setUnderstand] = useState(false);
  const [content, setContent] = useState(false);

  const understandClickHandler = () => {
    setUnderstand(true);
  };

  const contentClickHandler = () => {
    setContent(true);
    if (currentUser.role === "customer") {
      dispatch(deleteAllReviewsThunk(currentUser._id));
    }
    else {
      dispatch(deleteAllSellsThunk(currentUser._id));
    }
  };

  const accountClickHandler = () => {
    setContent(true);
    if (currentUser.role === "customer") {
      dispatch(deleteCustomerThunk(currentUser._id));
    }
    else {
      dispatch(deleteSellerThunk(currentUser._id));
    }
    
    // log out
    cookie.remove("userInfo", {path: "/"});
    dispatch(logout());
    nav("/");
  };



  const deleteData = () => {
    return (
      <>
        <div className="fw-bold mb-2">We will delete your {currentUser.role === "customer" ? "reviews" : "sells"} first.</div>
        <div className="btn btn-warning mb-2" onClick={contentClickHandler}>Delete My Content</div>
      </>
    );
  };

  const deleteUser = () => {
    return (
      <>
        <div className="fw-bold mb-2">Now you can delete your account.</div>
        <div className="btn btn-danger mb-2" onClick={accountClickHandler}>Delete My Account</div>
      </>
    );
  };

  return (
    <>
      <h3>Delete Your OMDb Account</h3>
      <div className="list-group">
        <li className="list-group-item">
          <div className="fw-bold mb-2">Account deletion is irreversible, please click I Understand.</div>
          <div className="btn btn-outline-primary" onClick={understandClickHandler}>I Understand</div>
          {understand && <hr/>}
          {understand && deleteData()}
          {content && <hr/>}
          {content && deleteUser()}
        </li>
      </div>
    </>
  );
};
export default SettingAll;