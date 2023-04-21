import React from "react";
import {useLocation, Routes, Route} from "react-router";


import CustomerInfo from "./CustomerInfo";

const ProfileComponent = () => {
  // find path info, /profile/customer or seller
  // const {pathname} = useLocation();
  // const paths = pathname.split('/');



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