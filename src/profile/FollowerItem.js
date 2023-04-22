import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import { findCustomerIdThunk } from "../services/customers-thunks";
import { findOtherReviewsThunk } from "../services/reviews-thunks";
import { updateFollowThunk } from "../services/customers-thunks";
// import { findCustomerFollowerThunk } from "../services/customers-thunks";

const FollowerItem = ({customer}) => { // change this to customer

  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;
  
  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  const dispatch = useDispatch();

  // followList >> {"idA": "...", "A": {"following": []}, "idB": "...", "B": {"follower": []}}
  const followClickHandler = () => {
    let A = currentUser.following.slice();
    A.push(customer._id);
    let B = customer.follower.slice()
    B.push(currentUser._id);
    let followList = {"idA": currentUser._id, "A": {"following": A}, "idB": customer._id, "B": {"follower": B}};
    // ask computer to load the user first
    dispatch(findCustomerIdThunk(customer._id));
    dispatch(updateFollowThunk(followList));
    // dispatch(findCustomerFollowerThunk(currentUser._id));
  };

  // force refresh the profile page
  const nameClickHandler = () => {
    dispatch(findCustomerIdThunk(customer._id));
    dispatch(findOtherReviewsThunk(customer._id));
  };


  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center">
        <img className="rounded-circle me-2" width={40} height={40} src={customer.icon} alt="Icon"/>
        <Link to={`/profile/customer/${currentUser && currentUser._id === customer._id ? "reviews" : customer._id + "/reviews"}`} 
          style={{textDecorationLine:"none"}} 
          className="text-black fw-bold"
          onClick={nameClickHandler}
          >{customer.name}</Link>
        {/* button part */}
        {pathsLength === 4 && <div className="ms-auto">
          {!(currentUser.following.includes(customer._id)) && <span className="btn btn-outline-success" onClick={followClickHandler} title="Follow this profile"><i className="bi bi-check-square"></i> Follow</span>}
        </div>}
      </div>
    </li>
  );
};
export default FollowerItem;