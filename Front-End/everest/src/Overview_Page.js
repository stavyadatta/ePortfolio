import React, {useState} from "react";
import "./Overview_Page.css";
import {Link} from "react-router-dom";
import background from "./Icons/profile_background.jpg";

function OverviewPage() {
    const [selected, setSelected] = useState("");

  const checkClicked = e => { setSelected(e.target.id); console.log(selected); }

  return(
    <div className = "profile_overview_page">
      <img src={background} alt="background" id = "profile_background"/>
      <div className = "page_headers">
        <h1>Welcome,</h1>
        <h1>Niphan Sethi</h1>
        <h5 id = "description">Here is a guide to get started</h5>
        {/* <h5 id = "description">Create your portfolio and share your achievements</h5>
        <button id = "add_projects">Add Projects Now</button> */}
        
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