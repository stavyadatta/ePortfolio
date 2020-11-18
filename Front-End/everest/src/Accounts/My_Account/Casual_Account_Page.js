import React, {useState} from "react";
import "./Casual_Account_Page.css";
import Navbar from "../../Navbar/Navbar";
import Casual_Account_Image from "../../Images/casual_account_bg.png";
import firebase from "../../Firebase";
import { useSelector } from "react-redux";
import BackBtn from "../../Generic_Components/Back_Icon";
import animateComponents from "../../Generic_Components/Page_Animations";
import HeaderEntry from "../../Generic_Components/Entry_With_Header";
import SignOut from "../../Icons/signout_btn.svg";

function CasualAccountPage() {

    const [editable, setEditable] = useState(false);
	const [fname, setFName] = useState("");
	const [lname, setLName] = useState("");
	const [template, setTemplate] = useState("");
    const [email, setEmail] = useState("");

    let userProfile = useSelector(state=>(state.firebase.profile));
	let userAuth = useSelector(state=>(state.firebase.auth));
    
    const enableEdits = e => {
		changeReadOnly(false, "");
		animateComponents(e, "casual_enable_edit", "casual_editing_btns", 0.5, 0.3);
		setEditable(true);
	}

	const disableEdits = e => {
		resetFields();
		document.getElementById("casual_template_active").value = userProfile.template;
		resetSetters();
        changeReadOnly(true, "_active");
		setEditable(false);
		animateComponents(e, "casual_editing_btns", "casual_enable_edit", 0.5, 0.3);
    }
	
    const saveEdits = e => {
		setPlaceholder("casual_fname_active", fname);
		setPlaceholder("casual_lname_active", lname);
		setPlaceholder("casual_email_input_active", email);
		if (template === "") { document.getElementById("casual_template_active").value = userProfile.template; }
		else { document.getElementById("casual_template_active").value = template; }
		updateDatabase();
		resetFields();
        resetSetters();
        changeReadOnly(true, "_active");
		setEditable(false);
		animateComponents(e, "casual_editing_btns", "casual_enable_edit", 0.5, 0.3);
		alert("Confirmation: Your Changes have been Saved");
    }

    const resetSetters = () => {
		setFName("");
		setLName("");
		setTemplate("");
		setEmail("");
	}

	const updateField = e => {
    	let fieldValue = e.target.value; 
		if (e.target.id === "casual_fname_active") { setFName(fieldValue); }
		else if (e.target.id === "casual_lname_active") { setLName(fieldValue); }
		else if (e.target.id === "casual_email_input_active") { setEmail(fieldValue); }
    	else { setTemplate(fieldValue); }
	}

	const updateDatabase = () => {

		const updatedTemplate = (template === "") ? userProfile.template : template;

		let fname = document.getElementById("casual_fname_active").placeholder;
		let lname = document.getElementById("casual_lname_active").placeholder;
		let email = document.getElementById("casual_email_input_active").placeholder;
		let user = firebase.auth().currentUser

		firebase.functions().httpsCallable("user-update")({
			userId: user.uid,
			firstName: fname,
			lastName: lname,
			email: email,
			template: updatedTemplate
		}).then(()=>{
			user.updateEmail(email)
		}).then(()=>{
			//Send email verification
		}).catch(e=>console.log(e));
    }
    
    const handleLogout = function(){ 
        firebase.auth().signOut()
    }

    return(
        <div className = "casual_account_page">
            <div className = "partition_account_page">
                <img src = {Casual_Account_Image} id = "casual_account_image" alt = "" />
                <div className = "account_info_partition">
                    <h1 id = "casual_account_header">My Account</h1>
				    <BackBtn />
                    <EnableEditBtns EnableEdits = {enableEdits} DisableEdits = {disableEdits} SaveEdits = {saveEdits} />
			        <UserInfo Editable = {editable} Update = {updateField} userProfile={userProfile} uid={userAuth.uid}/>
                </div>
            </div>
            
            <Navbar />
            <img src = {SignOut} id = "casual_account_signout" alt = "" onClick = {handleLogout}/>
        </div>
    );
}

function setPlaceholder(componentID, value) {
	if (value !== "") {
		document.getElementById(componentID).placeholder = value;
	} 
}

function resetFields() {
    document.getElementById("casual_fname_active").value = "";
	document.getElementById("casual_lname_active").value = "";
    document.getElementById("casual_email_input_active").value = "";
}


function UserInfo(props) {
	let profile = props.userProfile;
	let uid = props.uid

	return(
		<div className = "casual_user_info">
			
			<HeaderEntry divClassName = "casual_user_first_name" header = "First Name:" 
			entryID = {props.Editable ? "casual_fname_active" : "casual_fname"} default = {profile.firstName} 
			onChange = {props.Update} readOnly = {true}/>

			<HeaderEntry divClassName = "casual_user_last_name" header = "Last Name:" 
			onChange = {props.Update} entryID = {props.Editable ? "casual_lname_active" : "casual_lname"} 
			default = {profile.lastName} readOnly = {true}/>

			<HeaderEntry divClassName = "casual_user_id" header = "Search String (Read Only):"
			entryID = "casual_id" default = {uid} readOnly = {true}/>

			<TemplateSelector chosenTemplate = {profile.template} Editable = {props.Editable} header = "Portfolio Template:" Update = {props.Update}/>

			<HeaderEntry divClassName = "casual_user_email" header = "Email Address:" 
			entryID = {props.Editable ? "casual_email_input_active" : "casual_email_input"} default = {profile.email}
			onChange = {props.Update} readOnly = {true}/>

			<HeaderEntry divClassName = "casual_url_link" header = "Link for Sharing (Read Only):" 
			entryID = "casual_url_input" default = {"https://impressive-hall-288310.web.app/projects/"+uid} readOnly = {true}/>

		</div>
	);
}

function TemplateSelector(props) {
	
	return(
		<div className = "casual_chosen_template">
			<label id = "casual_entry_header">{props.header}</label>
			<select name="template" id={props.Editable ? "casual_template_active" : "casual_template"} 
			onChange = {e => props.Update(e)} disabled = {true} defaultValue = {props.chosenTemplate}>
				<option value="Professional">Professional</option>
				<option value="Casual">Casual</option>
			</select>
		</div>
	);
}

function changeReadOnly(readonly_status, active_string) {
	document.getElementById("casual_fname" + active_string).readOnly = readonly_status;
	document.getElementById("casual_lname" + active_string).readOnly = readonly_status;
	document.getElementById("casual_template" + active_string).disabled = readonly_status;
	document.getElementById("casual_email_input" + active_string).readOnly = readonly_status;
}

function EnableEditBtns(props) {
	return(
		<div>
			<div className = "casual_enable_edit">
				<button className = "casual_account_btns" id = "casual_edit_account_info" onClick = {(e) => props.EnableEdits(e)}>Edit</button>
			</div>
			<div className = "casual_editing_btns">
				<button className = "casual_account_btns" id = "casual_save_info" onClick = {(e) => props.SaveEdits(e)}>Save</button>
				<button className = "casual_account_btns" id = "casual_discard_changes" onClick = {(e) => props.DisableEdits(e)}>Cancel</button>
			</div>
		</div>
	);
}


export default CasualAccountPage;