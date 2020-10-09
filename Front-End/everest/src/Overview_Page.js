import React, {useState} from "react";
import "./Overview_Page.css";
import {Link} from "react-router-dom";
import Achievement_Image from "./Images/achievement_bg_image.png";
import Sun_Image from "./Images/sun_bg_image.png";
import Home_Btn from "./Icons/home_btn.svg";
import About_Btn from "./Icons/about_btn.svg";
import Signout_Btn from "./Icons/signout_btn.svg";

function OverviewPage() {
  
  const [selected, setSelected] = useState("");
  const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

  return(
    <div className = "profile_overview_page">
      <div className = "background_graphics">
        <img src={Sun_Image} id = "sun_image" alt="sun"/>
        <img src={Achievement_Image} id = "achievement_image" alt="mountain_achievement"/>
      </div>
      <div className = "buttons">
        <img src={Home_Btn} id = "home_btn" alt="home"/>
        <img src={About_Btn} id = "about_btn" alt="about"/>
        <img src={Signout_Btn} id = "signout_btn" alt="signout"/>
      </div>
     
      
      <div className = "page_headers">
        <p>Welcome ,</p>
        <p id = "userName">Niphan Sethi</p>
        <h1 id = "description">Here is a guide to get started</h1>
      </div>

      <div className = "header_overview_btns">
        <button className = "overview_btns" id = "welcome" onClick = {checkClicked}>Welcome</button>
        <button className = "overview_btns" id = "profile" onClick = {checkClicked}>My Profile</button>
        <button className = "overview_btns" id = "about_me" onClick = {checkClicked}>About Me</button>
        <Link to = "/addproject">
            <button className = "overview_btns" id = "artifacts" onClick = {checkClicked}>Portfolio Artifacts</button>
        </Link>
       
      </div>

    </div>
  );
}

export default OverviewPage;