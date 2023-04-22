import React from "react";
import {Routes, Route} from "react-router";


import CustomerInfo from "./CustomerInfo";

const ProfileComponent = () => {

  return (
    <>
      <Routes>
        {/* load customer page here */}
        <Route path="customer/*" element={<CustomerInfo/>}/>
        {/* load seller page here */}
        <Route path="seller/*" element={<CustomerInfo/>}/>
      </Routes>
    </>
  );
}
export default ProfileComponent;