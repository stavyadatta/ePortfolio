import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Professional_Account_Page.css";
import animateComponents from "../../Generic_Components/Page_Animations";
import HeaderEntry from "../../Generic_Components/Entry_With_Header";
import Mountain from "../../Images/account_mountain.png";
import Sun_Image from "../../Images/sun_bg_image.png";
import NavIcons from "../../Generic_Components/Nav_Icons";
import firebase from "../../Firebase";
import { useSelector } from "react-redux";
import BackBtn from "../../Generic_Components/Back_Icon";
import EnableEditBtns from "../../Generic_Components/Edit_Btns";

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
		resetFields();
		document.getElementById("template_active").value = userProfile.template;
		resetSetters();
        changeReadOnly(true, "_active");
		setEditable(false);
		animateComponents(e, "editing_btns", "enable_edit", 0.5, 0.3);
    }
	
    const saveEdits = e => {
		if (submitChecker()) {
			setPlaceholder("fname_active", fname);
			setPlaceholder("lname_active", lname);
			setPlaceholder("email_input_active", email);
			if (template === "") { document.getElementById("template_active").value = userProfile.template; }
			else { document.getElementById("template_active").value = template; }
			updateDatabase();
			resetFields();
			resetSetters();
			changeReadOnly(true, "_active");
			setEditable(false);
			animateComponents(e, "editing_btns", "enable_edit", 0.5, 0.3);
			alert("Confirmation: Your Changes have been Saved");
		}
	}

	const submitChecker = () => {
		if (document.getElementById("fname_active").value.length > 80) {
			alert("First name field must not be longer than 80 characters");
			return false;
		}
		if (document.getElementById("lname_active").value.length > 80) {
			alert("Last name field must not be longer than 80 characters");
			return false;
		}
		if (document.getElementById("email_input_active").value.length > 320) {
			alert("Email field must not be longer than 320 characters");
			return false;
		}
		return true;
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

	const updateDatabase = async () => {

		const updatedTemplate = (template === "") ? userProfile.template : template;

		let fname = document.getElementById("fname_active").placeholder;
		let lname = document.getElementById("lname_active").placeholder;
		let email = document.getElementById("email_input_active").placeholder;
		let user = firebase.auth().currentUser;

		await firebase.functions().httpsCallable("user-update")({
			userId: user.uid,
			firstName: fname,
			lastName: lname,
			email: email,
			template: updatedTemplate
		}).catch(e=>alert(e));
		
		
	}

	return(
		<div className = "account_page">
			<h1 id = "account_header">My Account</h1>
            <SetBackground />
			<Link to = "/profile">
				<BackBtn />
			</Link>
			<NavIcons />
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

function resetFields() {
    document.getElementById("fname_active").value = "";
	document.getElementById("lname_active").value = "";
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

			<HeaderEntry divClassName = "user_id" header = "Search String (Read Only):"
			entryID = "id" default = {uid} readOnly = {true}/>

			<TemplateSelector chosenTemplate = {profile.template} Editable = {props.Editable} header = "Portfolio Template:" Update = {props.Update}/>

			<HeaderEntry divClassName = "user_email" header = "Email Address:" 
			entryID = {props.Editable ? "email_input_active" : "email_input"} default = {profile.email}
			onChange = {props.Update} readOnly = {true}/>

			<HeaderEntry divClassName = "url_link" header = "Link for Sharing (Read Only):" 
			entryID = "url_input" default = {"https://impressive-hall-288310.web.app/projects/"+uid} readOnly = {true}/>

		</div>
	);
}

function TemplateSelector(props) {
	
	return(
		<div className = "chosen_template">
			<label id = "entry_header">{props.header}</label>
			<select name="template" id={props.Editable ? "template_active" : "template"} 
			onChange = {e => props.Update(e)} disabled = {true} defaultValue = {props.chosenTemplate}>
				<option value="Professional">Professional</option>
				<option value="Casual">Casual</option>
			</select>
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
