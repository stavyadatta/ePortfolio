import React from "react";
import "./Verify_Page.css"
import Signout_Btn from "../Icons/signout_btn.svg";
import firebase from "../Firebase"


function verifyPage(props){
  const handleLogout = function(){ 
    firebase.auth().signOut()
  }

    return(
        <div className="verifyPage">
          <div className="verifyPageTextBox">
            <div className="verifyPageText">
              <div className="verifyPageTextTitle">Verify Your Email</div>
              <div className="verifyPageTextBody">
                An email has been sent to your account for verification, please follow the attached link to verify your account.
              </div>
            </div>
          </div>
          <img src={Signout_Btn} id = "signout_btn" alt="signout" onClick={handleLogout}/>
        </div>
    )
}

export default verifyPage;