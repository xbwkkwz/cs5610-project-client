import {Routes, Route} from "react-router";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

import movieReducer from "./reducers/movie-reducer";
import userReducer from "./reducers/user-reducer";
import reviewReducer from "./reducers/review-reducer";
import sellReducer from "./reducers/sell-reducer";

import CookieComponent from "./cookie/CookieIndex";
import NavigationComponent from "./navigation/NavigationIndex";
import SignUpComponent from "./login/SignUpIndex";
import LoginComponent from "./login/LogInIndex";

import HomeComponent from "./home/HomeIndex";
import SearchComponent from "./search/SearchIndex"
import DetailComponent from "./detail/DetailIndex";
import FollowingComponent from "./following/FollowingIndex";
import ProfileComponent from "./profile/ProfileIndex";

import SideBarComponent from "./sidebar/SideBarIndex";

const store = configureStore({reducer: {moviesData: movieReducer, usersData: userReducer, reviewsData: reviewReducer, sellsData: sellReducer}});


const Website = () => {

  return (
    <Provider store={store}>
      <div className="row mt-2 mb-2">
        <CookieComponent/>
        <div className="col-2 col-md-2 col-lg-2 col-xl-2">
          <Routes>
            <Route path="/" element={<NavigationComponent/>}/>
            <Route path="/search" element={<NavigationComponent/>}/>
            <Route path="/details/*" element={<NavigationComponent/>}/>
            <Route path="/profile/*" element={<NavigationComponent/>}/>
            <Route path="/following" element={<NavigationComponent/>}/>
            <Route path="/setting" element={<NavigationComponent/>}/>
          </Routes>
        </div>

        <div className="col-10 col-md-10 col-lg-7 col-xl-7" style={{"position": "relative"}}>
          <Routes>
            <Route path="/signup" element={<SignUpComponent/>}/>
            <Route path="/login" element={<LoginComponent/>}/>

            <Route path="/" element={<HomeComponent/>}/>
            <Route path="/search" element={<SearchComponent/>}/>
            <Route path="/details/*" element={<DetailComponent/>}/>
            <Route path="/profile/*" element={<ProfileComponent/>}/>
            <Route path="/following" element={<FollowingComponent/>}/>
          </Routes>
        </div>
        
        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-3 col-xl-3">
          <Routes>
            <Route path="/" element={<SideBarComponent/>}/>
            <Route path="/search" element={<SideBarComponent/>}/>
            <Route path="/details/*" element={<SideBarComponent/>}/>
            <Route path="/profile/*" element={<SideBarComponent/>}/>
            <Route path="/following" element={<SideBarComponent/>}/>
            <Route path="/setting" element={<SideBarComponent/>}/>
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Website;