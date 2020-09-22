import React from "react";
import "./App.css";
import LoginPage from "./Login_Page";
import EntryBox from "./Entry_Box";

function App() {
  return(
    /*<div className = "register_page">
      <div className = "switch_to_login_container">
        	<h2 id = "have_an_account">Already Have an Account ?</h2>
        	<button id = "login_btn">Login</button>
      </div>
      <div className = "register_container">
        <h2 id = "register_header">Register</h2>
        <div className = "register_fields">
          <div className = "name_fields">
            <EntryBox id = "first_name" textType = "text" default = "First Name" onChange = {""}/>
            <EntryBox id = "last_name" textType = "text" default = "Last Name" onChange = {""}/>
          </div>
          <EntryBox id = "email_entry" textType = "text" default = "Email Address" onChange = {""}/>
          <EntryBox id = "password_entry" textType = "text" default = "Password" onChange = {""}/>
          <EntryBox id = "confirm_password_entry" textType = "text" default = "Confirm Password" onChange = {""}/>
          <button id = "register">Register</button>
        </div>
      </div>
    </div>*/
    <LoginPage />
  );
}

export default App;