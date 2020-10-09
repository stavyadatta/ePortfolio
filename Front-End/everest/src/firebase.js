const firebase = require('firebase/app');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');
require('firebase/functions');

const firebaseConfig = {
	apiKey: "AIzaSyArZEwLWk_Ghu1ZDxXmuOOz3NyASt8ezpc",
	authDomain: "impressive-hall-288310.firebaseapp.com",
	databaseURL: "https://impressive-hall-288310.firebaseio.com",
	projectId: "impressive-hall-288310",
	storageBucket: "impressive-hall-288310.appspot.com",
	messagingSenderId: "955883012726",
	appId: "1:955883012726:web:e527a673ef6c5794385557",
	measurementId: "G-N1JX5XFSV3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
