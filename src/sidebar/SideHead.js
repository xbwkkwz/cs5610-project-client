import React from "react";
import { useSelector } from "react-redux";



const SideHead = () => {

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  
  // current user head
  const head = () => {
    return (
      <div className="list-group">
        <li className="list-group-item d-grid justify-content-center">
          <div className="d-grid justify-content-center">{currentUser && currentUser.role === "customer" ? "Customer" : "Seller"}</div>
          <div className="d-grid justify-content-center"><img className="rounded-circle img-thumbnail" width={100} height={100} src={currentUser.icon} alt="Icon"/></div>
          <div className="fw-bold d-grid justify-content-center">{currentUser.name}</div>
        </li>
      </div>
    );
  };

  return (
    <div className="position-fixed">
      {currentUser && head()}
      
    </div>
  );
};
export default SideHead;












