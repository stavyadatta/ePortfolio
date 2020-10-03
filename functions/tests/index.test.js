// At the top of test/index.test.js
const test = require('firebase-functions-test')({
    databaseURL: 'https://my-project.firebaseio.com',
    storageBucket: 'my-project.appspot.com',
    projectId: 'my-project',
}, '../impressive-hall-288310-6cb866cafafe.json');

const functions = require('firebase-functions')
const key = functions.config().stripe.key