import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector, useDispatch} from "react-redux";

import {logout} from "../reducers/user-reducer";
import { current } from "@reduxjs/toolkit";


const NavigationComponent = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  console.log("path number is: " + paths);
  const active = paths[1];

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);

  // log out
  const dispatch = useDispatch();
  const logoutClickHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="list-group mb-2">
        <Link to="/" className="list-group-item">
          <i className="bi bi-align-top" title="OMDb"></i>
        </Link>

        <Link to="/" className={`list-group-item ${active === '' ? 'active' : ''}`}>
          <i className="bi bi-house" title="Home"></i>
          <span className="d-none d-xl-inline"> Home</span></Link>
        
        <Link to="/search" className={`list-group-item ${active === 'search' ? 'active' : ''}`}>
          <i className="bi bi-search" title="Explore"></i>
          <span className="d-none d-xl-inline"> Search</span></Link>

        <Link to="/profile" className={`list-group-item ${active === 'profile' ? 'active' : ''}`}>
          <i className="bi bi-bell" title="Notifications"></i>
          <span className="d-none d-xl-inline"> Profile</span></Link>

        <Link to="/store" className={`list-group-item ${active === 'store' ? 'active' : ''}`}>
          <i className="bi bi-envelope" title="Messages"></i>
          <span className="d-none d-xl-inline"> Store</span></Link>

        <Link to="/bookmarks" className={`list-group-item ${active === 'bookmarks' ? 'active' : ''}`}>
          <i className="bi bi-bookmark" title="Bookmarks"></i>
          <span className="d-none d-xl-inline"> Bookmarks</span></Link>
      </div>
      {!currentUser && <Link to="/signup" className="d-grid btn btn-secondary rounded-pill mb-2">Signup</Link>}
      {!currentUser && <Link to="/login" className="d-grid btn btn-primary rounded-pill">Login</Link>}
      {currentUser && <div className="d-grid btn btn-primary rounded-pill" onClick={logoutClickHandler}>Logout</div>}
    </>
  );
};
export default NavigationComponent;

