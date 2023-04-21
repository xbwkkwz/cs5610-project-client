import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

import FollowerItem from "./FollowerItem";


const FollowerList = () => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;

  // load initial data from reducer
  const {currentFollower, otherFollower, floading, fresponse} = useSelector(state => state.usersData);
  
  let followerArray = [];
  if (pathsLength === 4) {
    followerArray = currentFollower;
  }
  else {
    followerArray = otherFollower;
  }
  
  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";
  
  
  
  return(
    <> 
      {floading && <div className="mb-2">Loading followers...</div>}
      {!floading && followerArray.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      <ul className="list-group">
        {fresponse && followerArray.map(c => <FollowerItem key={c._id} customer={c}/>)}
      </ul>
    </>
  );
};
export default FollowerList;