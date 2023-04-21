import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

import FollowingItem from "./FollowingItem";


const FollowingList = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;

  // load initial data from reducer
  const {currentFollowing, otherFollowing, floading, fresponse} = useSelector(state => state.usersData);
  
  let followingArray = [];
  if (pathsLength === 4) {
    followingArray = currentFollowing;
  }
  else {
    followingArray = otherFollowing;
  }
  
  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";
  
  
  
  return(
    <> 
      {floading && <div className="mb-2">Loading followings...</div>}
      {!floading && followingArray.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      <ul className="list-group">
        {fresponse && followingArray.map(c => <FollowingItem key={c._id} customer={c}/>)}
      </ul>
    </>
  );
};
export default FollowingList;