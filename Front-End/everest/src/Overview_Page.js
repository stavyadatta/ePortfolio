import React, {useState} from "react";
import "./Overview_Page.css";
import CreateCarousel from "./Overview_Page_Carousel";
import {Link} from "react-router-dom";
import Achievement_Image from "./Images/achievement_bg_image.png";
import Sun_Image from "./Images/sun_bg_image.png";
import Home_Btn from "./Icons/home_btn.svg";
import About_Btn from "./Icons/about_btn.svg";
import Signout_Btn from "./Icons/signout_btn.svg";

function OverviewPage() {
  
  const [onPage, setOnPage] = useState("welcome");
  const changePageRender = e => {
    console.log(e.target.id); 
    switch(e.target.id) {
      case "account":
        setOnPage("account");
        break;
      case "about":
        setOnPage("about");
        break;
      case "artifacts":
        setOnPage("artifacts");
        break;
      case "welcome":
        setOnPage("welcome");
        break; 
      default:
        setOnPage("welcome");
    };
  }

  return(
    <div className = "profile_overview_page">
      <div className = "background_graphics">
        <img src={Sun_Image} id = "sun_image" alt="sun"/>
        <img src={Achievement_Image} id = "achievement_image" alt="mountain_achievement"/>
      </div>
      <div className = "buttons">
        <img src={Home_Btn} id = "home_btn" alt="home"/>
        <img src={About_Btn} id = "about_btn" alt="about"/>
        <img src={Signout_Btn} id = "signout_btn" alt="signout" onClick = {SignOut}/>
      </div>
     
      <CreateCarousel />

      <div className = "header_overview_btns">
        <button className = "overview_btns" id = {onPage === "welcome" ? "active_page" : onPage} onClick = {changePageRender}>Welcome</button>
        <button className = "overview_btns" id = {onPage === "account" ? "active_page" : onPage} onClick = {changePageRender}>My Account</button>
        <button className = "overview_btns" id = {onPage === "about" ? "active_page" : onPage} onClick = {changePageRender}>About Me</button>
        <Link to = "/addproject">
            <button className = "overview_btns" id = {onPage === "artifacts" ? "active_page" : onPage} onClick = {changePageRender}>Portfolio Artifacts</button>
        </Link>
       
      </div>

    </div>
  );
}

function SignOut() {
  console.log("user has signed out");
}

export default OverviewPage;