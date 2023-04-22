import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, Routes, Route} from "react-router";

// login
import { findCustomerReviewsThunk } from "../services/reviews-thunks";
import { findCustomerFollowingThunk } from "../services/customers-thunks";
import { findCustomerFollowerThunk } from "../services/customers-thunks";
import { updateFollowThunk } from "../services/customers-thunks";
import { findSellerSellsThunk } from "../services/sells-thunks";

// not login
import { findCustomerIdThunk } from "../services/customers-thunks";
import { findSellerIdThunk } from "../services/sellers-thunks";
// getting reviews, followings, followers
import { findOtherReviewsThunk } from "../services/reviews-thunks";
import { findOtherFollowingThunk } from "../services/customers-thunks";
import { findOtherFollowerThunk } from "../services/customers-thunks";
// getting sells,
import { findOtherSellsThunk } from "../services/sells-thunks";


// reuse module
import DetailNav from "../detail/DetailNav";
import DetailReviewList from "../detail/DetailReviewList";
import FollowingList from "./FollowingList";
import FollowerList from "./FollowerList";
import DetailSellList from "../detail/DetailSellList";



const CustomerInfo= () => {
  // find path info, /profile/customer or seller/id/reviews or followings or followers or sells
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;
  const pathsRole = paths[2];
  let userid = "";
  if (pathsLength === 5) {
    userid = paths[3];
  }

  // load initial user data from reducer
  const {currentUser, otherUser, loading, response, error} = useSelector(state => state.usersData);
  // const currentid = currentUser ? currentUser._id : null;
  
  const dispatch = useDispatch();
  const nav = useNavigate();

  // auto load for current customer
  useEffect(() => {
    // update the dependency problem last!!!!!!!!!!
    if (currentUser && pathsLength === 4 && pathsRole === "customer") {
      dispatch(findCustomerReviewsThunk(currentUser._id));
      dispatch(findCustomerFollowingThunk(currentUser._id));
      dispatch(findCustomerFollowerThunk(currentUser._id));
    }
    else if (currentUser && pathsLength === 4 && pathsRole === "seller") {
      dispatch(findSellerSellsThunk(currentUser._id));
    }
    else if (pathsLength === 5 && pathsRole === "customer"){
      dispatch(findCustomerIdThunk(userid));
      dispatch(findOtherReviewsThunk(userid));
      dispatch(findOtherFollowingThunk(userid));
      dispatch(findOtherFollowerThunk(userid));
    } 
    else if (pathsLength === 5 && pathsRole === "seller") {
      dispatch(findSellerIdThunk(userid));
      dispatch(findOtherSellsThunk(userid));
    }
  }, [currentUser, pathsLength, pathsRole, userid, dispatch]); // use auto redner
  

  // redirect to home page
  useEffect(() => {
    if (!currentUser && pathsLength === 4) nav("/login");
  });
  
  // which data to display
  let user = null;
  if (pathsLength === 4) {
    user = currentUser;
  }
  else {
    user = otherUser;
  }
  
  // followList >> {"idA": "...", "A": {"following": []}, "idB": "...", "B": {"follower": []}}
  const followClickHandler = () => {
    let A = currentUser.following.slice();
    A.push(otherUser._id);
    let B = otherUser.follower.slice()
    B.push(currentUser._id);
    let followList = {"idA": currentUser._id, "A": {"following": A}, "idB": otherUser._id, "B": {"follower": B}};
    // if directly access the self profile, there is no other user yet
    dispatch(findCustomerIdThunk(otherUser._id));
    // update the data
    dispatch(updateFollowThunk(followList));
    // need to render twice to see the result, do not know why
    // dispatch(findOtherFollowerThunk(otherUser._id));
    // dispatch(findOtherFollowerThunk(otherUser._id));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
  };

  // followList >> {"idA": "...", "A": {"following": []}, "idB": "...", "B": {"follower": []}}
  const unfollowClickHandler = () => {
    let A = currentUser.following.filter(cid => cid !== otherUser._id);
    let B = otherUser.follower.filter(cid => cid !== currentUser._id);
    let followList = {"idA": currentUser._id, "A": {"following": A}, "idB": otherUser._id, "B": {"follower": B}};
    // if directly access the self profile, there is no other user yet
    dispatch(findCustomerIdThunk(otherUser._id));
    // update the data
    dispatch(updateFollowThunk(followList));
    // need to render twice to see the result, do not know why
    // dispatch(findOtherFollowerThunk(otherUser._id));
    // dispatch(findOtherFollowerThunk(otherUser._id));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
    // dispatch(findCustomerFollowingThunk(currentUser._id));
  };
  
  // go back to visit history
  const backClickHandler = () => {
    nav(-1);
  }

  // define the top part
  const userInfo = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="btn" onClick={backClickHandler} title="Back to last page"><i className="bi bi-backspace"></i> Back</div>
          <img className="img-fluid mb-2" src={user.bg} alt="Background"/>
          {/* head and button */}
          <div className="d-flex">
            <div className="me-2" style={{width: "15%"}}><img className="img-thumbnail rounded-circle"  src={user.icon} alt="icon"/></div>
            <div>
              {pathsLength === 4 && <i className="bi bi-balloon-heart fs-4 text-success">Say Hi to~</i>}
              <div className="fs-2 fw-bold">{user.name}</div>
              
              {currentUser && currentUser.role === "customer" && (paths[2] === "customer")  && (pathsLength === 5) && !(currentUser.following.includes(otherUser._id)) && 
                <div className="btn btn-outline-success" onClick={followClickHandler} title="Follow this profile"><i className="bi bi-check-square"></i> Follow</div>}
              {currentUser && currentUser.role === "customer" && (paths[2] === "customer")  && (pathsLength === 5) && (currentUser.following.includes(otherUser._id)) && 
                <div className="btn btn-outline-warning" onClick={unfollowClickHandler} title="Unfollow this profile"><i className="bi bi-x-square"></i> Unfollow</div>}
            </div>
            <div className="ms-auto">
              {pathsLength === 4 && <Link to="/edit/profile" className="btn btn-outline-primary rounded-pill">Edit profile</Link>}
            </div>
          </div>

          {/* bio */}
          {user.bio !== "" && <div>{user.bio}</div>}
          <hr/>

          {/* address */}
          {("address" in user) && (user.address !== "") &&
            <div className="text-secondary">
              <i className="bi bi-pin-map me-1"></i>
              <span className="text-secondary">{user.address}</span>
            </div>}

          {/* website */}
          {("website" in user) && (user.website !== "") &&
            <div className="text-secondary">
              <i className="bi bi-shop me-1"></i>
              <Link to={`https://${user.website}`} style={{textDecorationLine:"none"}} className="text-secondary">{user.website}</Link>
            </div>}

          {/* business hour */}
          {("businesshour" in user) && (user.businesshour !== "") &&
            <div className="text-secondary">
              <i className="bi bi-alarm me-1"></i>
              <span className="text-secondary">{user.businesshour}</span>
            </div>}
          
          {/* join date */}
          <div className="text-secondary">
            <i className="bi bi-calendar"></i>
            <span className="ms-1 me-3">Joined {user.joindate.slice(0, 15)}</span>
          </div>
          
          {/* follow */}
          {"following" in user && <div>
            <span className="fw-bold">{user.following.length}</span><span className="ms-1 me-3 text-secondary">Followings</span>
            <span className="fw-bold">{user.follower.length}</span><span className="ms-1 me-3 text-secondary">Followers</span>
          </div>}
        </li>
      </ul>
    );
  };

  return (
    <>
      {/* top user info */}
      <div className="mb-2">
        {loading && <div>Loading...</div>}
        {!loading && !response && <div>{error}</div>}
        {user && !loading && response && userInfo()}
      </div>
      {/* load navigator here */}
      {!loading && response && <DetailNav/>}
      {/* load review or following or follower */}
      <Routes>
        <Route path={`${userid}/reviews`} element={!loading && response && <DetailReviewList imdbID={""}/>}/>
        <Route path={`${userid}/followings`} element={!loading && response && <FollowingList/>}/>
        <Route path={`${userid}/followers`} element={!loading && response && <FollowerList/>}/>
        <Route path={`${userid}/sells`} element={!loading && response && <DetailSellList imdbID={""}/>}/>
      </Routes>
    </>
  );
}
export default CustomerInfo;