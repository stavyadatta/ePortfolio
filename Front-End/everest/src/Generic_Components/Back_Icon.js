import React from "react";
import Back_Icon from "../Icons/back_icon.svg";
import "./Back_Icon.css";
import {Link} from "react-router-dom"; 

function BackBtn() {
    return (
        <Link to = "/profile">
            <img src = {Back_Icon} id = "back_icon" alt = "Back"/>
        </Link>
    );
}

export default BackBtn;