import React from "react";
import {Routes, Route} from "react-router";

import EditProfile from "./EditProfile";
import EditReview from "./EditReview";
import EditSell from "./EditSell";


const EditComponent = () => {


  return (
    <>
      <Routes>
        {/* edit profile */}
        <Route path="profile" element={<EditProfile/>}/>
        {/* edit review */}
        <Route path="review/*" element={<EditReview/>}/>
        {/* edit sell */}
        <Route path="sell/*" element={<EditSell/>}/>
      </Routes>
    </>
  );
}
export default EditComponent;