import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import cookie from "react-cookies";

import { findCustomerCookieThunk } from "../services/customers-thunks";
import { findSellerCookieThunk } from "../services/sellers-thunks";



const CookieComponent = () => {
  const dispatch = useDispatch();

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  
  const userInfo = cookie.load("userInfo");
  
  useEffect(() => {
    if (!currentUser && userInfo && userInfo.role === "customer") {
      dispatch(findCustomerCookieThunk(userInfo._id));
    }
    else if (!currentUser && userInfo && userInfo.role === "seller") {
      dispatch(findSellerCookieThunk(userInfo._id));
    }
  });

};
export default CookieComponent;