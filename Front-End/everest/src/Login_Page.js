import React, {useState} from "react";

import "./Login_Page.css";
import RegisterPage from "./Register_Page";
import RetrievePassword from "./Reset_Password";
import animateComponents from "./Generic_Components/Page_Animations";
import BindKeyToComponent from "./Generic_Components/Bind_Key_To_Component";
import EntryBox from "./Generic_Components/Entry_Box";
import SmallBtn from "./Generic_Components/Small_Btn";
import Login_Unhovered from "./Icons/login_btns/login_unhovered.png";
import Login_Hovered from "./Icons/login_btns/login_hovered.png";
import firebase from './Firebase';


function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
    const updateField = e => {
    	let fieldValue = e.target.value; 
    	if (e.target.id === "email_entry") { 
			setEmail(fieldValue); 
		}
    	else { setPassword(fieldValue); }
    }

	const fieldAuthentications = () => {
		if (email === "" || password === "") { alert("Error : One or more fields are empty."); } 
		else {
			const auth = firebase.auth();
			auth.signInWithEmailAndPassword(email, password).catch(function(error) {
				console.log(error.message);
				var errorMessage = error.message;
				alert('Error : ' + errorMessage);
			});
		}
	}
	
	
	// can submit login fields by pressing enter key 
	BindKeyToComponent(["Enter", "NumpadEnter"], fieldAuthentications);

	return (
		<div>
			<div className = "login_page">
				<div className = "content_container">
					<RetrievePassword />
					<div className = "create_account_container">
						<h2 id = "create_account_header">Create an Account</h2>
						<button id = "register_btn" 
						onClick = {(e) => animateComponents(e, "login_page", 
						"register_page", 0.55, 0.18)}>Register</button>
					</div>
					<div className = "login_fields_container">
						<h2 id = "login_header">Login</h2>
						<LoginFields authenticate = {fieldAuthentications} updateField = {updateField}/>
					</div>
				</div>	
			</div>
			<RegisterPage />
		</div>
	);
}
  
  
function LoginFields(props) {
    return (
    	<div className = "user_inputs">
    		<EntryBox id = "email_entry" textType = "text" 
    		default = "Enter Email Address"
        	onChange = {props.updateField} />
    		<PasswordComponents authenticate = {props.authenticate} 
        	onChange = {props.updateField} loggedIn = {props.loggedIn}/>
      	</div>
    );
}
  
function PasswordComponents(props) {
    
	const [loginImage, setLoginImage] = useState(Login_Unhovered); 
  
    return(
    	<div className = "password_elements">
        	<EntryBox id = "password_entry" textType = "password" 
            default = "Enter Password" onChange = {props.onChange} />
			<div> 
				<img id = "login_icon_unhovered" src={loginImage} alt="Login" 
            	onClick = {props.authenticate} 
            	onMouseEnter = {() => setLoginImage(Login_Hovered)}
            	onMouseLeave = {() => setLoginImage(Login_Unhovered)} />
			</div>
        	<ForgotPassword />
        </div>
    );
    
}

function ForgotPassword() {
	return (
		<SmallBtn id = "forgot_password" 
		callBack = {(e) => {animateComponents(e, "login_fields_container", "forgot_your_password", 0.5, 0.3)}} 
		text = "Forgot your Password?"/>
	);
}

export default LoginPage;