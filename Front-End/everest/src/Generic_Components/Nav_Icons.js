import React from "react";
import "./Nav_Icons.css";
import Home from "../Icons/home_btn.svg";
import About from "../Icons/about_btn.svg";
import Signout from "../Icons/signout_btn.svg";
import firebase from "../Firebase";
import {Link} from "react-router-dom";

function NavIcons() {

  const handleLogout = function(){ 
    firebase.auth().signOut()
  }

    return(
        <div className = "nav_btns">
            <Link to = "/" >
            <img src = {Home} id = "home_icon" alt = "home"/>
            </Link>
            <img src = {About} id = "about_icon" alt = "about"/>
            <img src = {Signout} id = "signout_icon" alt = "signout" onClick={handleLogout}/>
        </div>
    );
}

export default NavIcons;