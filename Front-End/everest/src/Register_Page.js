import React, { useState } from "react";
import "./Register_Page.css";
import EntryBox from "./Generic_Components/Entry_Box";
import animateComponents from "./Generic_Components/Page_Animations";
import { firebase } from './firebase';

function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateFields = e => {
    	let fieldValue = e.target.value; 
      if (e.target.id === "first_name") { setFirstName(fieldValue); }
      else if (e.target.id === "last_name") { setLastName(fieldValue); }
      else if (e.target.id === "reg_email_entry") { setEmail(fieldValue); }
      else if (e.target.id === "reg_password_entry") { setPwd(fieldValue); }
    	else { setConfirmPassword(fieldValue); }
    }

    const fieldAuthentications = () => {
      console.log(firstName, lastName, email, pwd, confirmPassword);
      const auth = firebase.auth();
		  auth.createUserWithEmailAndPassword(email, pwd).catch(function(error) {
			  var errorMessage = error.message;
			  window.alert('Error : ' + errorMessage);
		  });
    }

    return (
      <div className = "register_page">
        <div>
          <div className = "switch_to_login_container">
            <h2 id = "have_an_account">Have an Account ?</h2>
            <button id = "login_btn" onClick = {(e) => animateComponents(e, "register_page", 
						"login_page", 0.55, 0.18)}>Login</button>
          </div>
          <div className = "register_container">
            <h2 id = "register_header">Register</h2>
            <AllRegisterFields updateFields = {updateFields} authenticate = {fieldAuthentications}/>
          </div>
        </div>
      </div>

    );
}

function NameFields(props) {
  return(
    <div className = "name_fields">
      <EntryBox id = "first_name" textType = "text" default = "First Name" onChange = {props.fieldInfo}/>
      <EntryBox id = "last_name" textType = "text" default = "Last Name" onChange = {props.fieldInfo}/>
    </div>
  );
}

function AllRegisterFields(props) {
  return (
    <div className = "register_fields">
      <NameFields fieldInfo = {props.updateFields}/>
      <EntryBox id = "reg_email_entry" textType = "text" default = "Email Address" onChange = {props.updateFields}/>
      <EntryBox id = "reg_password_entry" textType = "password" default = "Password" onChange = {props.updateFields}/>
      <EntryBox id = "confirm_password_entry" textType = "password" default = "Confirm Password" onChange = {props.updateFields}/>
      <button id = "register" onClick = {props.authenticate}>Register</button>
    </div>
  );

}


export default RegisterPage;