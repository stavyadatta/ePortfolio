const functions = require('firebase-functions');
const express = require('express')
const userRouter = require('./routers/user.routes.js')
const port = process.env.PORT || 3000

const app = new express()
app.use(express.json())
app.use(userRouter)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app)
