import React from "react";
import "./Register_Page.css";
import EntryBox from "./Entry_Box";
import LoginPage from "./Login_Page";

function RegisterPage() {
    return (
      <div className = "register_page">
        <div className = "switch_to_login_container">
              <h2 id = "have_an_account">Have an Account ?</h2>
              <button id = "login_btn" /*onClick = {""}*/>Login</button>
        </div>
        <div className = "register_container">
          <h2 id = "register_header">Register</h2>
          <div className = "register_fields">
            <div className = "name_fields">
              <EntryBox id = "first_name" textType = "text" default = "First Name" /*onChange = {""}*//>
              <EntryBox id = "last_name" textType = "text" default = "Last Name" /*onChange = {""}*//>
            </div>
            <EntryBox id = "reg_email_entry" textType = "text" default = "Email Address" /*onChange = {""}*//>
            <EntryBox id = "reg_password_entry" textType = "text" default = "Password" /*onChange = {""}*//>
            <EntryBox id = "confirm_password_entry" textType = "text" default = "Confirm Password" /*onChange = {""}*//>
            <button id = "register">Register</button>
          </div>
        </div>
      </div>
    );
}


export default RegisterPage;