import React, {useState} from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { updateSellThunk } from "../services/sells-thunks";


const EditSell = () => {

  const dispatch = useDispatch();
  const nav = useNavigate();

  // // find path info, /edit/sell/id
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const sellId = paths[3];
  
  // load initial user data from reducer
  const {movieSell, currentSell} = useSelector(state => state.sellsData);
  const sells = [...movieSell, ...currentSell];
  const sell = sells.find(r => r._id === sellId);
  

  // go back to last page after save
  const backClickHandler = () => {
    nav(-1);
  }

  // load origional data
  const [price, setPrice] = useState(sell.price);

  // change price
  const priceChangeHandler = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  // save change and exit
  const saveClickHandler = () => {
    if (price < 0.01) {
      alert("price cannot be 0!");
      return;
    }
    let newSell = {"_id": sell._id, "price": price};
    dispatch(updateSellThunk(newSell));
    backClickHandler();
  };

  // cancel change
  const cancelClickHandler = () => {
    backClickHandler();
  };



  return (
    <ul className="list-group">
      <li className="list-group-item">
        {/* edit part */}
        <form>
          {/* content */}
          <div className="mb-3">
            <label htmlFor="edit_price" className="form-label fw-bold">Price</label>
            <div className="input-group">
                <span className="input-group-text">$</span>
                <input id="edit_price" className="form-control" type="number" placeholder={sell.price} value={price} min={0.01} aria-describedby="priceHelp" onChange={priceChangeHandler}></input>
            </div>
            <div id="priceHelp" className="form-text">Adjust the price.</div>
          </div>
          {/* button */}
          <div className="btn btn-outline-primary me-2" title="Save changes" onClick={saveClickHandler}><i className="bi bi-check-square"></i> Save</div>
          <div className="btn btn-outline-success" title="Cancel changes" onClick={cancelClickHandler}><i className="bi bi-x-square"></i> Cancel</div>
        </form>
      </li>
    </ul>
  );
};
export default EditSell;