import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

import DetailSellItem from "./DetailSellItem";
import {createSellThunk} from "../services/sells-thunks";

const DetailSellList = ({imdbID}) => {
  // find path info
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const pathsLength = paths.length;

  const dispatch = useDispatch();

  // load initial data from reducer
  const {currentUser} = useSelector(state => state.usersData);
  const {movieSell, currentSell, otherSell, loading, response} = useSelector(state => state.sellsData);

  // store string
  const [price, setPrice] = useState(0.0);
  const [format, setFormat] = useState('Digital');

  let sell = {};
  if (currentUser) {
    sell = {"sellerid": currentUser._id, "movieid": imdbID, "price": price, "format": format};
  } 

  let sellArray = [];
  if (imdbID.length !== 0) {
    sellArray = movieSell;
  }
  else if (imdbID.length === 0 && pathsLength === 4) {
    sellArray = currentSell;
  }
  else {
    sellArray = otherSell;
  }

  // no content image address
  const imgAddress = "https://i.imgflip.com/4irqtl.png";

  const priceChangeHandler = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const formatChangeHandler = (event) => {
    const value = event.target.value;
    setFormat(value);
  };
  
  const sellClickHandler = () => {
    if (price <= 0.0) {return}
    dispatch(createSellThunk(sell));
  };
  
  const addSell = () => {
    return (
      <div className="list-group mb-2">
        <li className="list-group-item">
          <form>
            <label className="d-flex"><span className="text-success fw-bold me-4">Price</span>
              <div className="input-group mb-2">
                <span className="input-group-text">$</span>
                <input className="form-control"
                  type="number"
                  placeholder={0.00}
                  value={price}
                  min={0.01}
                  onChange={priceChangeHandler}
                  ></input>
              </div>
            </label>
            {/* second part */}
            <div className="d-flex">
              <label className="d-flex"><span className="text-success fw-bold me-2">Format</span>
                <select className="form-select"
                  onChange={formatChangeHandler}>
                  <option value="Digital">Digital</option>
                  <option value="Blu-ray">Blu-ray</option>
                  <option value="DVD">DVD</option>
                </select>
              </label>
              <div className="btn btn-outline-primary ms-auto"
                onClick={sellClickHandler}
              ><i className="bi bi-card-text"></i> Sell</div>
            </div>
          </form>
        </li>
      </div>
    );
  };

  return(
    <> 
      {(imdbID.length !== 0) && currentUser && (currentUser.role === "seller") && addSell()}
      {loading && <div className="mb-2">Loading sells...</div>}
      {!loading && sellArray.length === 0 && <img className="img-thumbnail w-100" src={imgAddress} alt=""/>}
      
      <ul className="list-group">
        {response && sellArray.map(r => <DetailSellItem key={r._id} sell={r}/>)}
      </ul>
    </>
  );
};
export default DetailSellList;