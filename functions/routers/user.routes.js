const express = require("express")
const userController = require('../controllers/userController.js')
const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const { response } = require('express');

const port = process.env.PORT || 3000
const router = new express.Router()

router.post('/user/add', (req, res) => {
    var x = userController.addUser(req.body)
    res.send("Added")
})

router.post('/user/update', (req, res) => {
    userController.updateUser(req.body).then((response) => {
        console.log(response)
        return res.send("Updated")
    }).catch((error) => {
        console.log(error)
    })
})

router.post('/user/delete', (req, res) => {
    userController.deleteUser(req.body).then((response) => {
        return res.send(response)
    }).catch((error) => {
        console.log(error)
    })
})
module.exports = router
