const functions = require('firebase-functions');

const port = process.env.PORT || 3000

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


const express = require('express')
const bodyParser = require('body-parser')
const app = new express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./routes/projects.routes.js')(app);

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send("Hello World")
});

/*
app.listen(port, () => {
    console.log("listening on ", port)
});
*/

exports.app = functions.https.onRequest(app);
