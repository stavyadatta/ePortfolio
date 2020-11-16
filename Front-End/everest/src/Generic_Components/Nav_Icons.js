import React from "react";
import "./Nav_Icons.css";
import Home from "../Icons/home_btn.svg";
import About from "../Icons/about_btn.svg";
import Signout from "../Icons/signout_btn.svg";

function NavIcons() {
    return(
        <div className = "nav_btns">
            <img src = {Home} id = "home_icon" alt = "home"/>
            <img src = {About} id = "about_icon" alt = "about"/>
            <img src = {Signout} id = "signout_icon" alt = "signout"/>
        </div>
    );
}

export default NavIcons;