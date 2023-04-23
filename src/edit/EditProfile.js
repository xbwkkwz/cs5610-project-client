import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { updateCustomerThunk } from "../services/customers-thunks";
import { updateSellerThunk } from "../services/sellers-thunks";


const EditProfile = () => {

  const dispatch = useDispatch();
  const nav = useNavigate();

  // load initial user data from reducer
  const {currentUser} = useSelector(state => state.usersData);

  // go back to last page after save
  const backClickHandler = () => {
    nav(-1);
  }

  // load origional data
  const [bg, setBg] = useState(currentUser.bg);
  const [icon, setIcon] = useState(currentUser.icon);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [password, setPassword] = useState(currentUser.password);
 
  const [address, setAddress] = useState(("address" in currentUser) ? currentUser.address : null);
  const [website, setWebsite] = useState(("website" in currentUser) ? currentUser.website : null);
  const [businesshour, setBusinesshour] = useState(("businesshour" in currentUser) ? currentUser.businesshour : null);
  
  
  // // change background image
  // const bgChangeHandler = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     setBg(event.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // // change icon iamge
  // const iconChangeHandler = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (event) => {
  //     setIcon(event.target.result);
  //   };
  // };

  // change bg
  const bgChangeHandler = (event) => {
    const value = event.target.value;
    setBg(value);
  };

  // change icon
  const iconChangeHandler = (event) => {
    const value = event.target.value;
    setIcon(value);
  };

  // change name
  const nameChangeHandler = (event) => {
    const value = event.target.value;
    setName(value);
  };

  // change bio
  const bioChangeHandler = (event) => {
    const value = event.target.value;
    setBio(value);
  };

  // change address
  const addressChangeHandler = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  // change website
  const websiteChangeHandler = (event) => {
    const value = event.target.value;
    setWebsite(value);
  };

  // change business hour
  const businesshourChangeHandler = (event) => {
    const value = event.target.value;
    setBusinesshour(value);
  };

  // change password
  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // save change and exit
  const saveClickHandler = () => {
    if (name === "" || password === "") {
      alert("Name or password cannot be empty!");
      return;
    }
    let user = {"_id": currentUser._id, "password": password, "name": name, "bio": bio, "icon": icon, "bg": bg};
    if (currentUser.role === "seller") {
      user = {...user, ...{"address": address, "website": website, "businesshour": businesshour}};
    }
    if (currentUser.role === "customer") {
      dispatch(updateCustomerThunk(user));
    }
    else {
      dispatch(updateSellerThunk(user));
    }
    backClickHandler();
  };

  // cancel change
  const cancelClickHandler = () => {
    backClickHandler();
  };

  // preview data
  const preview = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          {/* background */}
          <img className="rounded img-fluid mb-2" src={bg} alt="Background"/>

          {/* head and name*/}
          <div className="d-flex">
            <div className="me-2" style={{width: "15%"}}><img className="img-thumbnail rounded-circle" src={icon} alt="icon"/></div>
            <div>
              <i className="bi bi-balloon-heart fs-4 text-success">Say Hi to~</i>
              <div className="fs-2 fw-bold">{name}</div>
            </div>
          </div>

          {/* bio */}
          {bio !== "" && <div>{bio}</div>}
          <hr/>

          {/* address */}
          {("address" in currentUser) && (address !== "") &&
            <div className="text-secondary">
              <i className="bi bi-pin-map me-1"></i>
              <span className="text-secondary">{address}</span>
            </div>}

          {/* website */}
          {("website" in currentUser) && (website !== "") &&
            <div className="text-secondary">
              <i className="bi bi-shop me-1"></i>
              <Link to={`https://${website}`} style={{textDecorationLine:"none"}} className="text-secondary">{website}</Link>
            </div>}

          {/* business hour */}
          {("businesshour" in currentUser) && (businesshour !== "") &&
            <div className="text-secondary">
              <i className="bi bi-alarm me-1"></i>
              <span className="text-secondary">{businesshour}</span>
            </div>}
          
          {/* join date */}
          <div className="text-secondary">
            <i className="bi bi-calendar"></i>
            <span className="ms-1 me-3">Joined {currentUser.joindate.slice(0, 15)}</span>
          </div>
          
          {/* follow */}
          {"following" in currentUser && <div>
            <span className="fw-bold">{currentUser.following.length}</span><span className="ms-1 me-3 text-secondary">Followings</span>
            <span className="fw-bold">{currentUser.follower.length}</span><span className="ms-1 me-3 text-secondary">Followers</span>
          </div>}
        </li>
      </ul>
    );
  };


  // edit section here
  const userInfo = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <form>
            {/* background */}
            {/* <div className="mb-3">
              <label htmlFor="user_bg" className="form-label fw-bold">Background</label>
              <input type="file" className="form-control" id="user_bg" onChange={bgChangeHandler}/>
            </div> */}

            {/* icon */}
            {/* <div className="mb-3">
              <label htmlFor="user_icon" className="form-label fw-bold">Icon</label>
              <input type="file" className="form-control" id="user_icon" onChange={iconChangeHandler}/>
            </div> */}

            {/* background */}
            <div className="mb-3">
              <label htmlFor="user_bg" className="form-label fw-bold">Background</label>
              <input type="url" className="form-control" id="user_bg" aria-describedby="bgHelp" placeholder={currentUser.bg} value={bg} onChange={bgChangeHandler}/>
              <div id="bgHelp" className="form-text">Input the image URL.</div>
            </div>

            {/* icon */}
            <div className="mb-3">
              <label htmlFor="user_icon" className="form-label fw-bold">Icon</label>
              <input type="url" className="form-control" id="user_icon" aria-describedby="iconHelp" placeholder={currentUser.icon} value={icon} onChange={iconChangeHandler}/>
              <div id="iconHelp" className="form-text">Input the image URL.</div>
            </div>

            {/* name */}
            <div className="mb-3"><hr/>
              <label htmlFor="user_name" className="form-label fw-bold">Name</label>
              <input type="text" className="form-control" id="user_name" aria-describedby="nameHelp" placeholder={currentUser.name} value={name} onChange={nameChangeHandler}/>
              <div id="nameHelp" className="form-text">Choose a fun name.</div>
            </div>

            {/* bio */}
            <div className="mb-3">
              <label htmlFor="user_bio" className="form-label fw-bold">Bio</label>
              <textarea rows={5} className="form-control" id="user_bio" aria-describedby="bioHelp" placeholder={currentUser.bio} value={bio} onChange={bioChangeHandler}></textarea>
              <div id="bioHelp" className="form-text">Talk more about yourself.</div>
            </div>

            {/* address */}
            {currentUser.role === "seller" && <div className="mb-3"><hr/>
              <label htmlFor="user_address" className="form-label fw-bold">Address</label>
              <input type="text" className="form-control" id="user_address" placeholder={currentUser.address} value={address} onChange={addressChangeHandler}/>
            </div>}

            {/* website */}
            {currentUser.role === "seller" && <div className="mb-3"><hr/>
              <label htmlFor="user_website" className="form-label fw-bold">Website</label>
              <input type="text" className="form-control" id="user_website" placeholder={currentUser.website} value={website} onChange={websiteChangeHandler}/>
            </div>}

            {/* business hour */}
            {currentUser.role === "seller" && <div className="mb-3"><hr/>
              <label htmlFor="user_businesshour" className="form-label fw-bold">Business Hour</label>
              <input type="text" className="form-control" id="user_businesshour" placeholder={currentUser.businesshour} value={businesshour} onChange={businesshourChangeHandler}/>
            </div>}

            {/* email */}<hr/>
            <div className="mb-3">
              <label htmlFor="user_email" className="form-label fw-bold">Email</label>
              <input type="email" className="form-control" id="user_email" aria-describedby="emailHelp" placeholder={currentUser.email} disabled={true}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="user_password" className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" id="user_password" aria-describedby="passwordHelp" placeholder={currentUser.password} value={password} onChange={passwordChangeHandler}/>
              <div id="passwordHelp" className="form-text">Make a strong password.</div>
            </div>
            <div className="btn btn-outline-primary me-2" title="Save changes" onClick={saveClickHandler}><i className="bi bi-check-square"></i> Save</div>
            <div className="btn btn-outline-success" title="Cancel changes" onClick={cancelClickHandler}><i className="bi bi-x-square"></i> Cancel</div>
          </form>
        </li>
      </ul>
    );
  };

  return (
    <>
      <div className="btn" onClick={backClickHandler} title="Cancel and back"><i className="bi bi-backspace"></i> Back</div>
      {preview()}
      <hr/>
      {userInfo()}
    </>
  );
};
export default EditProfile;