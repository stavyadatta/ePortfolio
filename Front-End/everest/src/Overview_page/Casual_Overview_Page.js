import React, {useState} from "react"
import "./Casual_Overview_Page.css";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import CasualBg from "../Images/new_template_background.jpg";
import SignOut from "../Icons/signout_btn.svg";
import firebase from "../Firebase";
import ConfirmDialog from "../Generic_Components/Dialog_Confirmation_Box";


function CasualOverviewPage() {

    let userProfile = useSelector(state=>state.firebase.profile);
    let [confirmation, setConfirmation] = useState(false);


    const handleLogout = function(){ 
        firebase.auth().signOut()
    }

    return(
        <div className = "casual_overview">
            <img src = {CasualBg} alt = "" id = "casual_overview_bg" />
            <div id = "dim_image"></div>
            <img src = {SignOut} alt = "" id = "casual_signout" onClick={() => {setConfirmation(true)}}/>
            <ConfirmDialog
                title="Log Out"
                open={confirmation}
                setOpen={setConfirmation}
                onConfirm={handleLogout}>
                    Are you sure you want to Log Out?
            </ConfirmDialog>
            <h3 id = "casual_welcome">Welcome to Everest,</h3>
            <h3 id = "casual_username">{userProfile.firstName} {userProfile.lastName}</h3>
            <Navbar />
        </div>
    );
}

export default CasualOverviewPage;