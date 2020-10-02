import React, {useState} from "react";
import User from "./Icons/user_profile.png";
import "./Overview_Page.css";
import {Link} from "react-router-dom";

function OverviewPage() {
    const [selected, setSelected] = useState("");

  const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

  return(
    <div className = "profile_overview_page">
      <div className = "page_headers">
        <h1>Hello, Niphan Sethi</h1>
        <h5 id = "description">Create your portfolio and share your achievements</h5>
        <button id = "add_projects">Add Projects Now</button>
        <div className = "profile_picture">
          <img src={User} id = "profile_pic" alt="Profile"/>
          <p id = "profile_pic_label">Add a Profile Picture</p>
        </div>
        
      </div>
      <div className = "header_overview_btns">
        <button className = "overview_btns" id = "welcome" onClick = {checkClicked}>Welcome</button>
        <button className = "overview_btns" id = "profile" onClick = {checkClicked}>My Profile</button>
        <button className = "overview_btns" id = "about_me" onClick = {checkClicked}>About Me</button>
        <Link to = "/project">
            <button className = "overview_btns" id = "artifacts" onClick = {checkClicked}>Artifacts</button>
        </Link>
       
      </div>

    </div>
  );
}

export default OverviewPage;