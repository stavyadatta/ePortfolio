import React, {useState} from "react";
import "./Reset_Password.css";
import SmallBtn from "./Generic_Components/Small_Btn";
import animateComponents from "./Generic_Components/Page_Animations";
import EntryBox from "./Generic_Components/Entry_Box";
import Login_Unhovered from "./Icons/login_btns/login_unhovered.png";
import Login_Hovered from "./Icons/login_btns/login_hovered.png";

function RetrievePassword() {

	return(
		<div className = "forgot_your_password">
			<h2 id = "reset_password">Reset Password</h2>
			<div className = "forgot_pwd_fields">
				<EntryBox id = "forgot_pwd_entry" textType = "text" 
				default = "Enter Email Address"
        		/*onChange = {""}*/ readonly = {false}/>
				<SubmitForm />
				<SmallBtn id = "back_to_login" 
				callBack = {(e) => {animateComponents(e, "forgot_your_password", "login_fields_container", 0.5, 0.3)}} 
				text = "Back to Login"/>
			</div>			
		</div>
	);
}

function SubmitForm() {
	
	const [submitImage, setSubmitImage] = useState(Login_Unhovered);

	const retrieve = () => {
		alert("Please Check your Email for a Verification ID");
	}

	return (
		<div className = "submit_reset_password">
			<EntryBox id = "confirm_email_pwd" textType = "text" 
			default = "Confirm Email Address"
			/*onChange = {""}*/ readonly = {false}/>
			<img id = "submit_icon_unhovered" 
			src={submitImage} alt="Submit" 
			onClick = {retrieve} 
			onMouseEnter = {() => setSubmitImage(Login_Hovered)}
			onMouseLeave = {() => setSubmitImage(Login_Unhovered)} />
		</div>
	);
}



export default RetrievePassword;