import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./My_Account_Page.css";
import animateComponents from "../Generic_Components/Page_Animations";
import HeaderEntry from "../Generic_Components/Entry_With_Header";
import Mountain from "../Images/account_mountain.png";
import Sun_Image from "../Images/sun_bg_image.png";
import Home from "../Icons/home_btn.svg";
import About from "../Icons/about_btn.svg";
import Signout from "../Icons/signout_btn.svg";
import firebase from "../Firebase";
import { useSelector } from "react-redux";
import BackBtn from "../Generic_Components/Back_Icon";

function MyAccountPage() {


	const [editable, setEditable] = useState(false);
	const [fname, setFName] = useState("");
	const [lname, setLName] = useState("");
	const [template, setTemplate] = useState("");
	const [email, setEmail] = useState("");
	
	let userProfile = useSelector(state=>(state.firebase.profile));
	let userAuth = useSelector(state=>(state.firebase.auth));
    
	const enableEdits = e => {
		changeReadOnly(false, "");
		animateComponents(e, "enable_edit", "editing_btns", 0.5, 0.3);
		setEditable(true);
	}

	const disableEdits = e => {
		resetFields(userProfile);
		resetSetters();
        changeReadOnly(true, "_active");
		setEditable(false);
		animateComponents(e, "editing_btns", "enable_edit", 0.5, 0.3);
    }
	
    const saveEdits = e => {
		setPlaceholder("fname_active", fname);
		setPlaceholder("lname_active", lname);
		document.getElementById("template_active").value = template;
		setPlaceholder("email_input_active", email);
		updateDatabase();
        disableEdits(e);
	}
	
	const resetSetters = () => {
		setFName("");
		setLName("");
		setTemplate("");
		setEmail("");
	}

	const updateField = e => {
    	let fieldValue = e.target.value; 
		if (e.target.id === "fname_active") { setFName(fieldValue); }
		else if (e.target.id === "lname_active") { setLName(fieldValue); }
		else if (e.target.id === "email_input_active") { setEmail(fieldValue); }
    	else { setTemplate(fieldValue); }
	}

	const updateDatabase = () => {

		let fname = document.getElementById("fname_active").placeholder;
		let lname = document.getElementById("lname_active").placeholder;
		let email = document.getElementById("email_input_active").placeholder;
		let template = document.getElementById("template_active").value;

		let user = firebase.auth().currentUser

		firebase.functions().httpsCallable("user-update")({
			userId: user.uid,
			firstName: fname,
			lastName: lname,
			email: email,
			template: template
		}).then(()=>{
			user.updateEmail(email)
		}).then(()=>{
			//Send email verification
		}).catch(e=>console.log(e));

	}
	
	return(
		<div className = "account_page">
			<h1 id = "account_header">My Account</h1>
            <SetBackground />
			<Link to = "/profile">
				<BackBtn />
			</Link>
			<div className = "nav_btns">
				<img src = {Home} id = "home_icon" alt = "home"/>
				<img src = {About} id = "about_icon" alt = "about"/>
				<img src = {Signout} id = "signout_icon" alt = "signout"/>
			</div>
			<EnableEditBtns EnableEdits = {enableEdits} DisableEdits = {disableEdits} SaveEdits = {saveEdits}/>
			<UserInfo Editable = {editable} Update = {updateField} userProfile={userProfile} uid={userAuth.uid}/>

		</div>
	);
}

function setPlaceholder(componentID, value) {
	if (value !== "") {
		document.getElementById(componentID).placeholder = value;
	} 
}

function resetFields(userProfile) {
    document.getElementById("fname_active").value = "";
	document.getElementById("lname_active").value = "";
	document.getElementById("template_active").value = userProfile.template;
    document.getElementById("email_input_active").value = "";
}

function SetBackground() {
    return(
        <div id = "background_img">
            <img src = {Sun_Image} id = "sun_image" alt = ""/>
            <img src = {Mountain} id = "mountain_image" alt = ""/>
        </div>
    );	
}

function UserInfo(props) {
	let profile = props.userProfile;
	let uid = props.uid
	return(
		<div className = "user_info">
			
			<HeaderEntry divClassName = "user_first_name" header = "First Name:" 
			entryID = {props.Editable ? "fname_active" : "fname"} default = {profile.firstName} 
			onChange = {props.Update} readOnly = {true}/>

			<HeaderEntry divClassName = "user_last_name" header = "Last Name:" 
			onChange = {props.Update} entryID = {props.Editable ? "lname_active" : "lname"} 
			default = {profile.lastName} readOnly = {true}/>

			<HeaderEntry divClassName = "user_id" header = "User ID:"
			entryID = "id" default = {uid} readOnly = {true}/>

			<TemplateSelector Editable = {props.Editable} header = "Portfolio Template:" Update = {props.Update}/>

			<HeaderEntry divClassName = "user_email" header = "Email Address:" 
			entryID = {props.Editable ? "email_input_active" : "email_input"} default = {profile.email}
			onChange = {props.Update} readOnly = {true}/>

			<HeaderEntry divClassName = "url_link" header = "Link for Sharing:" 
			entryID = "url_input" default = {"https://impressive-hall-288310.web.app/projects/"+uid} readOnly = {true}/>

		</div>
	);
}

function TemplateSelector(props) {
	return(
		<div className = "chosen_template">
			<label id = "entry_header">{props.header}</label>
			<select name="template" id={props.Editable ? "template_active" : "template"} 
			onChange = {e => props.Update(e)} disabled = {true}>
				<option value="Professional">Professional</option>
				<option value="Casual">Casual</option>
			</select>
		</div>
	);
}

function EnableEditBtns(props) {
	return(
		<div>
			<div className = "enable_edit">
				<button className = "account_btns" id = "edit_account_info" onClick = {(e) => props.EnableEdits(e)}>Edit</button>
			</div>
			<div className = "editing_btns">
				<button className = "account_btns" id = "save_info" onClick = {(e) => props.SaveEdits(e)}>Save</button>
				<button className = "account_btns" id = "discard_changes" onClick = {(e) => props.DisableEdits(e)}>Cancel</button>
			</div>
		</div>
	);
}


function changeReadOnly(readonly_status, active_string) {
	document.getElementById("fname" + active_string).readOnly = readonly_status;
	document.getElementById("lname" + active_string).readOnly = readonly_status;
	document.getElementById("template" + active_string).disabled = readonly_status;
	document.getElementById("email_input" + active_string).readOnly = readonly_status;
}



export default MyAccountPage;
