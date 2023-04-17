import React from "react";
import {Link} from "react-router-dom";


const DetailNav = ({imdbID}) => {

  return (
    <ul className="nav nav-tabs mb-2">
      <li className="nav-item"><Link to={`${imdbID}`} className="nav-link active">Reviews</Link></li>
      <li className="nav-item"><Link to={`${imdbID}/sells`} className="nav-link">Sells</Link></li>
    </ul>
  );
};
export default DetailNav;