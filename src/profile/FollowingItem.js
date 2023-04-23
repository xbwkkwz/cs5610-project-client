import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import { findCustomerIdThunk } from "../services/customers-thunks";
import { findOtherReviewsThunk } from "../services/reviews-thunks";
import { updateFollowThunk } from "../services/customers-thunks";
// import { findCustomerFollowingThunk } from "../services/customers-thunks";

const FollowingItem = ({customer}) => { // change this to customer

  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;
  
  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  const dispatch = useDispatch();

  // followList >> {"idA": "...", "A": {"following": []}, "idB": "...", "B": {"follower": []}}
  const unfollowClickHandler = () => {
    let A = currentUser.following.filter(cid => cid !== customer._id);
    let B = customer.follower.filter(cid => cid !== currentUser._id);
    let followList = {"idA": currentUser._id, "A": {"following": A}, "idB": customer._id, "B": {"follower": B}};
    // if directly access the self profile, there is no other user yet
    dispatch(findCustomerIdThunk(customer._id));
    // update the data
    dispatch(updateFollowThunk(followList));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
  };

  // force refresh the profile page
  const nameClickHandler = () => {
    dispatch(findCustomerIdThunk(customer._id));
    dispatch(findOtherReviewsThunk(customer._id))
  };


  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center">
        <Link to={`/profile/customer/${currentUser && currentUser._id === customer._id ? "reviews" : customer._id + "/reviews"}`}><img className="rounded-circle me-2" width={40} height={40} src={customer.icon} alt="Icon"/></Link>
        <Link to={`/profile/customer/${currentUser && currentUser._id === customer._id ? "reviews" : customer._id + "/reviews"}`} 
          style={{textDecorationLine:"none"}} 
          className="text-black fw-bold"
          onClick={nameClickHandler}>{customer.name}
        </Link>
        {/* button part */}
        {pathsLength === 4 && <div className="ms-auto">
          <span className="btn btn-outline-warning" onClick={unfollowClickHandler} title="Unfollow this profile"><i className="bi bi-x-square"></i> Unfollow</span>
        </div>}
      </div>
    </li>
  );
};
export default FollowingItem;