import React, { useState } from 'react';
import './Login_Page.css';
import EntryBox from './Entry_Box';
import Login_Unhovered from './login_btns/login_unhovered.png';
import Login_Hovered from './login_btns/login_hovered.png';

function LoginPage() {
	const animate_to_register_page = () => {};

	return (
		<div className="login_page">
			<div className="create_account_container">
				<h2 id="create_account_header">Create an Account</h2>
				<button id="register_btn" onClick={animate_to_register_page}>
					Register
				</button>
			</div>
			<div className="login_fields_container">
				<h2 id="login_header">Login</h2>
				<LoginFields />
			</div>
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

		var firebase = require('firebase/app');

		// Add the Firebase products that you want to use
		require('firebase/auth');
		require('firebase/firestore');

		var firebaseConfig = {
			apiKey: 'AIzaSyDs5WVLmuha65hLYcLaffqkZZ6mCcHIJLE',
			authDomain: 'fir-auth-f9ad7.firebaseapp.com',
			databaseURL: 'https://fir-auth-f9ad7.firebaseio.com',
			projectId: 'fir-auth-f9ad7',
			storageBucket: 'fir-auth-f9ad7.appspot.com',
			messagingSenderId: '810991043154',
			appId: '1:810991043154:web:0e258579192f65a55cd58b',
			measurementId: 'G-56GJJ1GDZG'
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);

		// Make auth and firestore references
		const auth = firebase.auth();
		const db = firebase.firestore();

		auth.signInWithEmailAndPassword(userName, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			window.alert('Error : ' + errorMessage);
		});
	};

	//Use this to observe when user is logged in or logged out
	const authChange = () => {
		auth.onAuthStateChanged(function(user) {
			if (user) {
				var email = user.email;
				alert('Active User ' + email);
			} else {
				alert('No Active User');
			}
		});
	};

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
			<p id="forgot_password">Forgot your Password?</p>
		</div>
	);
}

export default LoginPage;
