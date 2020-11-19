import React, {useState} from "react";
import "./Nav_Icons.css";
import Home from "../Icons/home_btn.svg";
import About from "../Icons/about_btn.svg";
import Signout from "../Icons/signout_btn.svg";
import ConfirmDialog from "../Generic_Components/Dialog_Confirmation_Box";
import firebase from "../Firebase";
import { Link } from "react-router-dom";


function NavIcons() {
    const [confirmation, setConfirmation] = useState(false);
    const handleLogout = function(){ 
        firebase.auth().signOut()
    }
    return(
        <div className = "nav_btns">
            <Link to="/profile">
                <img src = {Home} id = "home_icon" alt = "home"/>
            </Link>
            <Link to = "/about">
                <img src = {About} id = "about_icon" alt = "about"/>
            </Link>
            <img src = {Signout} id = "signout_icon" alt = "signout" onClick={() => setConfirmation(true)}/>
            <ConfirmDialog
                title="Log Out"
                open={confirmation}
                setOpen={setConfirmation}
                onConfirm={handleLogout}>
                    Are you sure you want to Log Out?
            </ConfirmDialog>
        </div>
    );
}

export default NavIcons;