import React, { useState } from 'react';
import './Register_Page.css';
import EntryBox from './Entry_Box';
import LoginPage from './Login_Page';
import { firebase } from './firebase';

function RegisterPage() {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ pwd, setPwd ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const updateField = (e) => {
		let fieldValue = e.target.value;
		if (e.target.id === 'first_name') {
			setFirstName(fieldValue);
		} else if (e.target.id === 'last_name') {
			setLastName(fieldValue);
		} else if (e.target.id === 'reg_email_entry') {
			setEmail(fieldValue);
		} else if (e.target.id === 'reg_password_entry') {
			setPwd(fieldValue);
		} else {
			setConfirmPassword(fieldValue);
		}
		return;
	};

	const fieldAuthentications = () => {
		//execute authentication code here...
		console.log(firstName, lastName, email, pwd, confirmPassword);
		const auth = firebase.auth();

		auth.createUserWithEmailAndPassword(email, pwd).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			window.alert('Error : ' + errorMessage);
		});
	};

	return (
		<div className="register_page">
			<div className="switch_to_login_container">
				<h2 id="have_an_account">Have an Account ?</h2>
				<button id="login_btn" /*onClick = {""}*/>Login</button>
			</div>
			<div className="register_container">
				<h2 id="register_header">Register</h2>
				<div className="register_fields">
					<div className="name_fields">
						<EntryBox id="first_name" textType="text" default="First Name" onChange={updateField} />
						<EntryBox id="last_name" textType="text" default="Last Name" onChange={updateField} />
					</div>
					<EntryBox id="reg_email_entry" textType="text" default="Email Address" onChange={updateField} />
					<EntryBox id="reg_password_entry" textType="password" default="Password" onChange={updateField} />
					<EntryBox
						id="confirm_password_entry"
						textType="password"
						default="Confirm Password"
						onChange={updateField}
					/>
					<button id="register" onClick={fieldAuthentications}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
