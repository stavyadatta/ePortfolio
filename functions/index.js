const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const engines = require("consolidate")
const { response } = require('express');
const express = require('express')
const userController = require('./controllers/userController.js')
const port = process.env.PORT || 3000

const app = new express()
app.use(express.json())

app.post('/user/add', (req, res) => {
  var x = userController.addUser(req.body)
  res.send("Added")
})

app.post('/user/update', (req, res) => {
  userController.updateUser(req.body).then((response) => {
      console.log(response)
      return res.send("Updated")
  }).catch((error) => {
    console.log(error)
  })
})

app.post('/user/delete', (req, res) => {
  userController.deleteUser(req.body).then((response) => {
      return res.send(response)
  }).catch((error) => {
    console.log(error)
  })
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app)