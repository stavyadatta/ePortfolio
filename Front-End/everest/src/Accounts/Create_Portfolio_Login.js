import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Create_Portfolio_Login.css";
import CreateRetrievePassword from "./Create_Forgot_Pwd";
import animateComponents from "../Generic_Components/Page_Animations";
import BindKeyToComponent from "../Generic_Components/Bind_Key_To_Component";
import EntryBox from "../Generic_Components/Entry_Box";
import SmallBtn from "../Generic_Components/Small_Btn";
import Login_Unhovered from "../Icons/login_btns/login_unhovered.png";
import Login_Hovered from "../Icons/login_btns/login_hovered.png";
import firebase from '../Firebase';
import HomeWhiteIcon from "../Icons/Home_White.svg";


function CreateLoginPortfolioPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
    const updateField = e => {
    	let fieldValue = e.target.value; 
    	if (e.target.id === "create_email_entry") { 
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
			<div className = "create_login_page">
				<div className = "create_content_container">
					<CreateRetrievePassword />
					<div className = "createport_account_container">
						<h2 id = "createport_account_header">Create an Account</h2>
						<button id = "create_register_btn" 
						onClick = {(e) => animateComponents(e, "create_login_page", 
						"create_portfolio_page", 0.55, 0.18)}>Register</button>
					</div>
					<div className = "create_login_fields_container">
						<h2 id = "create_login_header">Login</h2>
						<LoginFields authenticate = {fieldAuthentications} updateField = {updateField}/>
					</div>
					<Link to = "/">
						<img src = {HomeWhiteIcon} alt= "Home" id = "create_login_white_icon"/>
					</Link>
				</div>	
			</div>
		</div>
	);
}
  
  
function LoginFields(props) {
    return (
    	<div className = "create_user_inputs">
    		<EntryBox id = "create_email_entry" textType = "text" 
    		default = "Enter Email Address"
        	onChange = {props.updateField} readonly = {false}/>
    		<PasswordComponents authenticate = {props.authenticate} 
        	onChange = {props.updateField} loggedIn = {props.loggedIn}/>
      	</div>
    );
}
  
function PasswordComponents(props) {
    
	const [loginImage, setLoginImage] = useState(Login_Unhovered); 
  
    return(
    	<div className = "create_password_elements">
        	<EntryBox id = "create_password_entry" textType = "password" 
            default = "Enter Password" onChange = {props.onChange} />
			<div> 
				<img id = "create_login_icon_unhovered" src={loginImage} alt="Login" 
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
		<SmallBtn id = "create_forgot_password" 
		callBack = {(e) => {animateComponents(e, "create_login_fields_container", "create_forgot_your_password", 0.5, 0.3)}} 
		text = "Forgot your Password?"/>
	);
}

export default CreateLoginPortfolioPage;