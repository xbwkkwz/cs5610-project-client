import {Routes, Route} from "react-router";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

import movieReducer from "./reducers/movie-reducer";
import userReducer from "./reducers/user-reducer";


import NavigationComponent from "./navigation/NavigationIndex"
import SignUpComponent from "./login/SignUpIndex";
import LoginComponent from "./login/LogInIndex";

import SearchComponent from "./search/SearchIndex"
import DetailComponent from "./detail/DetailIndex";

import SideBarComponent from "./sidebar/SideBarIndex";

const store = configureStore({reducer: {moviesData: movieReducer, usersData: userReducer}});


const Website = () => {

  return (
    <Provider store={store}>
      <div className="row mt-2 mb-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          <Routes>
            <Route path="/" element={<NavigationComponent/>}/>
            <Route path="search" element={<NavigationComponent/>}/>
            <Route path="details/*" element={<NavigationComponent/>}/>
          </Routes>
        </div>

        <div className="col-10 col-md-10 col-lg-7 col-xl-6" style={{"position": "relative"}}>
          <Routes>
            <Route path="/signup" element={<SignUpComponent/>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="search" element={<SearchComponent/>}/>
            <Route path="details/*" element={<DetailComponent/>}/>

            {/* <Route path="explore" element={<ExploreComponent/>}/>
            <Route path="profile" element={<ProfileComponent/>}/>
            <Route path="edit-profile" element={<EditProfile/>}/> */}
          </Routes>
        </div>
        
        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
          {/* <WhoToFollowList/> */}
          <Routes>
            <Route path="/" element={<SideBarComponent/>}/>
            <Route path="search" element={<SideBarComponent/>}/>
            <Route path="details/*" element={<SideBarComponent/>}/>
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Website;