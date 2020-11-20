import React, { useState } from "react";
import "./Create_Portfolio.css";
import CreateLoginPortfolioPage from "./Create_Portfolio_Login";
import EntryBox from "../Generic_Components/Entry_Box";
import animateComponents from "../Generic_Components/Page_Animations";
import firebase from "../Firebase";
import HomeWhiteIcon from "../Icons/Home_White.svg";
import { Link } from "react-router-dom";

function CreatePortfolioPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateFields = (e) => {
    let fieldValue = e.target.value;
    if (e.target.id === "create_first_name") {
      setFirstName(fieldValue);
    } else if (e.target.id === "create_last_name") {
      setLastName(fieldValue);
    } else if (e.target.id === "create_reg_email_entry") {
      setEmail(fieldValue);
    } else if (e.target.id === "create_reg_password_entry") {
      setPwd(fieldValue);
    } else {
      setConfirmPassword(fieldValue);
    }
  };

  const fieldAuthentications = () => {
    let auth = firebase.auth();
    //check fields are filled out
    if (
      firstName === "" ||
      lastName === "" ||
      pwd === "" ||
      confirmPassword === "" ||
      email === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    //check if password confirmation matches
    if (pwd !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (document.getElementById("create_first_name").value.length > 80) {
			alert("First name field must not be longer than 80 characters");
			return;
		}
		if (document.getElementById("create_last_name").value.length > 80) {
			alert("Last name field must not be longer than 80 characters");
			return;
		}
		if (document.getElementById("create_reg_email_entry").value.length > 320) {
			alert("Email field must not be longer than 320 characters");
			return;
		}

    //create user auth and sign user in
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((res) => {
        firebase.functions().httpsCallable("user-add")({
          firstName: firstName,
          lastName: lastName,
          email: email,
          userId: res.user.uid,
        });
        return res.user;
      })
      .then((user) => {
        user.sendEmailVerification();
      })
      .catch((e) => window.alert(e));
  };
  
  //BindKeyToComponent(["Enter", "NumpadEnter"], fieldAuthentications);

  return (
    <div>
        <CreateLoginPortfolioPage />
        <div className="create_portfolio_page">
        <div>
            <div className="create_switch_to_login_container">
            <h2 id="create_have_an_account">Have an Account ?</h2>
            <button
                id="create_login_btn"
                onClick={(e) =>
                animateComponents(e, "create_portfolio_page", "create_login_page", 0.55, 0.18)
                }
            >
                Login
            </button>
            </div>
            <div className="create_register_container">
            <h2 id="create_register_header">Register</h2>
            <AllRegisterFields
                updateFields={updateFields}
                authenticate={fieldAuthentications}
            />
            <Link to= "/">
              <img src = {HomeWhiteIcon} alt = "Home" id = "create_register_white_home"/>
            </Link>
            </div>
        </div>
        </div>
    </div>
  );
}

function NameFields(props) {
  return(
    <div className = "create_name_fields">
      <EntryBox id = "create_first_name" textType = "text" default = "First Name" 
      onChange = {props.fieldInfo} readonly = {false}/>
      <EntryBox id = "create_last_name" textType = "text" default = "Last Name" 
      onChange = {props.fieldInfo} readonly = {false}/>
    </div>
  );
}

function AllRegisterFields(props) {
  return (
    <div className = "create_register_fields">
      <NameFields fieldInfo = {props.updateFields}/>
      <EntryBox id = "create_reg_email_entry" textType = "text" default = "Email Address" 
      onChange = {props.updateFields} readonly = {false}/>
      <EntryBox id = "create_reg_password_entry" textType = "password" default = "Password" 
      onChange = {props.updateFields} readonly = {false}/>
      <EntryBox id = "create_confirm_password_entry" textType = "password" default = "Confirm Password" 
      onChange = {props.updateFields} readonly = {false}/>
      <button id = "create_register" onClick = {props.authenticate}>Register</button>
    </div>
  );
}

export default CreatePortfolioPage;
