//firebase.initializeApp(firebaseConfig);

/*const txtEmail = document.getElementById('txtEmail');
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
});*/

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user info
	const email = signupForm['txtEmail'].value;
	const password = signupForm['txtPassword'].value;

	console.log(email, password);
});
