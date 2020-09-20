import React, {useState} from "react";
import "./Login_Page.css";
import Login_Unhovered from "./login_btns/login_unhovered.png";
import Login_Hovered from "./login_btns/login_hovered.png";

function LoginPage() {

    return (
    	<div className = "login_page">
    		<div className = "create_account_container">
        		<h2 id = "create_account_header">Create an Account</h2>
        		<button id = "register_btn">Register</button>
      		</div>
      	<div className = "login_fields_container">
        	<h2 id = "login_header">Login</h2>
        	<LoginFields />
      	</div>
    	</div>
	);
	
}
  
  
function LoginFields() {
  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const updateField = e => {
    	let fieldValue = e.target.value; 
    	if (e.target.id === "email_entry") { setUserName(fieldValue); }
    	else { setPassword(fieldValue); }
    	return;
    }
  
    const fieldAuthentications = () => {
    	//execute authentication code here...
    	console.log(userName, password);
    }
  
    return (
    	<form className = "user_inputs">
    		<EntryBox id = "email_entry" textType = "text" 
    		default = "Enter Username or Email Address"
        	onChange = {updateField} />
    		<PasswordComponents authenticate = {fieldAuthentications} 
        	onChange = {updateField} />
      	</form>
    );

}
  
function PasswordComponents(props) {
    
	const [loginImage, setLoginImage] = useState(Login_Unhovered); 
  
    return(
    	<div className = "password_elements">
        	<EntryBox id = "password_entry" textType = "password" 
            default = "Enter Password" onChange = {props.onChange} />
        	<img id = "login_icon_unhovered" src={loginImage} alt="Login" 
            onClick = {props.authenticate} 
            onMouseEnter = {() => setLoginImage(Login_Hovered)}
            onMouseLeave = {() => setLoginImage(Login_Unhovered)} />
        	<p id = "forgot_password">Forgot your Password?</p>
        </div>
    );
    
}

function EntryBox(props) {
	return (
		<input id = {props.id} type = {props.textType} placeholder = {props.default} 
		onChange = {props.onChange} />
	);
}

export default LoginPage;