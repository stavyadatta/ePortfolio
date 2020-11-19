import React, {useState} from "react";
import "./Professional_Overview_Page.css";
import CreateCarousel from "./Overview_Page_Carousel";
import {Link} from "react-router-dom";
import Achievement_Image from "../Images/achievement_bg_image.png";
import Sun_Image from "../Images/sun_bg_image.png";
import Home_Btn from "../Icons/home_btn.svg";
import About_Btn from "../Icons/about_btn.svg";
import Signout_Btn from "../Icons/signout_btn.svg";

import { connect } from "react-redux";

import { useSelector } from "react-redux"

import firebase from "../Firebase"
import ConfirmDialog from "../Generic_Components/Dialog_Confirmation_Box";

function OverviewPage() {
  let userProfile = useSelector(state=>state.firebase.profile);
  let userAuth = useSelector(state=>state.firebase.auth);
  let [confirmation, setConfirmation] = useState(false);
  let userId = userAuth.uid;
  const [selected, setSelected] = useState("");
  const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

  const handleLogout = function(){ 
    firebase.auth().signOut()
  }

  return(
    <div className = "profile_overview_page">
      <div className = "background_graphics">
        <img src={Sun_Image} id = "overview_sun_image" alt="sun"/>
        <img src={Achievement_Image} id = "achievement_image" alt="mountain_achievement"/>
      </div>
      <div className = "buttons">
        <Link to = "/" >
        <img src={Home_Btn} id = "home_btn" alt="home"/>
        </Link>
        <img src={About_Btn} id = "about_btn" alt="about"/>     
        <img src={Signout_Btn} id = "signout_btn" alt="signout" onClick={() => {setConfirmation(true)}}/>
        <ConfirmDialog
          title="Log Out"
          open={confirmation}
          setOpen={setConfirmation}
          onConfirm={handleLogout}>
            Are you sure you want to Log Out?
          </ConfirmDialog>
      </div>
     
      <CreateCarousel userProfile={userProfile}/>
     
      <div className = "header_overview_btns">
        <button className = "overview_btns" id = "search" onClick = {checkClicked}>Search</button>
        <Link to = "/myaccount">
          <button className = "overview_btns" id = "profile" onClick = {checkClicked}>My Account</button>
        </Link>
        <Link to = {`/mypage/${userId}`} >
        <button className = "overview_btns" id = "about_me" onClick = {checkClicked}>My Page</button>
        </Link>
        <Link to = {`/projects/${userId}`}>
            <button className = "overview_btns" id = "artifacts" onClick = {checkClicked}>Portfolio Artifacts</button>
        </Link>
       
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      auth:state.firebase.auth
  };
};

export default connect(mapStateToProps)(OverviewPage);
