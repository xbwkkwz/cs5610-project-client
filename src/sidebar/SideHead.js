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
          <img className="rounded-circle" width={100} src={`./icons/${currentUser.icon}`} alt="Icon"/>
          <div className="fw-bold d-grid justify-content-center">{currentUser.name}</div>
        </li>
      </div>
    );
  };

  return (
    <>
      {currentUser && head()}
    </>
  );
};
export default SideHead;












