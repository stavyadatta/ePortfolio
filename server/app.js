const firebase = require('firebase/app');
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

firebase.initializeApp(firebaseConfig);

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', (e) => {
	console.log('tt');
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailPassword(email, pass);
	promise.catch((e) => console.log(e.message));
});
