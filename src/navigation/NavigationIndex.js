import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector, useDispatch} from "react-redux";

import { getRandomMovies } from "../reducers/movie-reducer";
import {logout} from "../reducers/user-reducer";
import { searchRandomIdThunk } from "../services/movies-thunks";


const NavigationComponent = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const active = paths[1];

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  const {imdbIDArray} = useSelector(state => state.moviesData);
  
  const dispatch = useDispatch();
  
  // // get new set of movies
  // const homeClickHandler = () => {
  //   dispatch(getRandomMovies());
  //   dispatch(searchRandomIdThunk(imdbIDArray));
  // };

  // log out
  const logoutClickHandler = () => {
    dispatch(logout());
  };



  return (
    <>
      <div className="list-group mb-2">
        <div className="list-group-item text-success fw-bold">
          <i className="bi bi-film" title="OMDb"><span className="d-none d-xl-inline"> OMDb </span></i>
          <i className="bi bi-film d-none d-xl-inline" title="OMDb"></i>
        </div>

        <Link to="/" className={`list-group-item ${active === '' ? 'active' : ''}`}>
          <i className="bi bi-house" title="Home"></i>
          <span className="d-none d-xl-inline"> Home</span></Link>
        
        <Link to="/search" className={`list-group-item ${active === 'search' ? 'active' : ''}`}>
          <i className="bi bi-search" title="Search"></i>
          <span className="d-none d-xl-inline"> Search</span></Link>
        
        {currentUser && currentUser.role === "customer" && <Link to="/following" className={`list-group-item ${active === 'following' ? 'active' : ''}`}>
          <i className="bi bi-rss" title="Following"></i>
          <span className="d-none d-xl-inline"> Following</span></Link>}

        {currentUser && <Link to={`/profile/${currentUser.role === "customer" ? "customer/reviews" : "seller/sells"}`} className={`list-group-item ${active === 'profile' && paths.length === 4 ? 'active' : ''}`}>
          <i className="bi bi-people" title="Profile"></i>
          <span className="d-none d-xl-inline"> Profile</span></Link>}

        {<Link to={`${currentUser ? "/setting" : "/login"}`} className={`list-group-item ${active === 'setting' ? 'active' : ''}`}>
          <i className="bi bi-gear" title="Setting"></i>
          <span className="d-none d-xl-inline"> Setting</span></Link>}

      </div>
      {!currentUser && <Link to="/signup" className="d-grid btn btn-outline-secondary rounded-pill mb-2">Signup</Link>}
      {!currentUser && <Link to="/login" className="d-grid btn btn-outline-primary rounded-pill">Login</Link>}
      {currentUser && <Link to="/" className="d-grid btn btn-outline-primary rounded-pill" onClick={logoutClickHandler}>Logout</Link>}
    </>
  );
};
export default NavigationComponent;

