import React, { useState } from 'react';
import './Login_Page.css';
import RegisterPage from './Register_Page';
import EntryBox from './Entry_Box';
import { TimelineLite } from 'gsap';
import Login_Unhovered from './login_btns/login_unhovered.png';
import Login_Hovered from './login_btns/login_hovered.png';
import { firebase } from './firebase';

function LoginPage() {
	const animate = () => {
		const active = { opacity: 1, display: 'block', duration: 0.65 };
		const inactive = { opacity: 0, display: 'none', duration: 0.18 };
		const login_page = document.getElementsByClassName('login_page');
		const register_page = document.getElementsByClassName('register_page');

		let tl = new TimelineLite();
		tl.fromTo(login_page, active, inactive).fromTo(register_page, inactive, active);
	};

	return (
		<div className="forms">
			<div className="login_page">
				<RetrievePassword />
				<div className="create_account_container">
					<h2 id="create_account_header">Create an Account</h2>
					<button id="register_btn" onClick={animate}>
						Register
					</button>
				</div>
				<div className="login_fields_container">
					<h2 id="login_header">Login</h2>
					<LoginFields />
				</div>
			</div>
			<RegisterPage />
		</div>
	);
}

function LoginFields() {
	const [ userName, setUserName ] = useState('');
	const [ password, setPassword ] = useState('');

	const updateField = (e) => {
		let fieldValue = e.target.value;
		if (e.target.id === 'email_entry') {
			setUserName(fieldValue);
		} else {
			setPassword(fieldValue);
		}
		return;
	};

	const fieldAuthentications = () => {
		//execute authentication code here...
		console.log(userName, password);

		const auth = firebase.auth();

		auth.signInWithEmailAndPassword(userName, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			window.alert('Error : ' + errorMessage);
		});
	};

	//Use this to observe when user is logged in or logged out

	return (
		<form className="user_inputs">
			<EntryBox
				id="email_entry"
				textType="text"
				default="Enter Username or Email Address"
				onChange={updateField}
			/>
			<PasswordComponents authenticate={fieldAuthentications} onChange={updateField} />
		</form>
	);
}

function PasswordComponents(props) {
	const [ loginImage, setLoginImage ] = useState(Login_Unhovered);

	return (
		<div className="password_elements">
			<EntryBox id="password_entry" textType="password" default="Enter Password" onChange={props.onChange} />
			<img
				id="login_icon_unhovered"
				src={loginImage}
				alt="Login"
				onClick={props.authenticate}
				onMouseEnter={() => setLoginImage(Login_Hovered)}
				onMouseLeave={() => setLoginImage(Login_Unhovered)}
			/>
			<ForgotPassword />
		</div>
	);
}

function ForgotPassword() {
	return (
		<SmallBtn
			id="forgot_password"
			callBack={(e) => {
				animateComponents(e, 'login_fields_container', 'forgot_your_password');
			}}
			text="Forgot your Password?"
		/>
	);
}

function animateComponents(event, pageClassOne, pageClassTwo) {
	event.preventDefault();
	const active = { opacity: 1, display: 'block', duration: 0.2 };
	const inactive = { opacity: 0, display: 'none', duration: 0.2 };
	const pageOne = document.getElementsByClassName(pageClassOne);
	const pageTwo = document.getElementsByClassName(pageClassTwo);

	const tl = new TimelineLite();
	tl.fromTo(pageOne, active, inactive);
	tl.fromTo(pageTwo, inactive, active);
}

function RetrievePassword() {
	return (
		<div className="forgot_your_password">
			<h2 id="reset_password">Reset Password</h2>
			<EntryBox
				id="forgot_pwd_entry"
				textType="text"
				default="Enter Email Address"
				/*onChange = {""}*/
			/>
			<EntryBox
				id="confirm_email_pwd"
				textType="text"
				default="Confirm Email Address"
				/*onChange = {""}*/
			/>

			<SmallBtn
				id="back_to_login"
				callBack={(e) => {
					animateComponents(e, 'forgot_your_password', 'login_fields_container');
				}}
				text="Back to Login"
			/>

			<button id="next">Next</button>
		</div>
	);
}

function SmallBtn(props) {
	return (
		<button className="small_btn" id={props.id} onClick={props.callBack}>
			{props.text}
		</button>
	);
}

export default LoginPage;
