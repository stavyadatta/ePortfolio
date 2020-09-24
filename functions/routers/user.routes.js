const express = require("express")
const userController = require('../controllers/userController.js')
const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const { response } = require('express');

const port = process.env.PORT || 3000
const router = new express.Router()

router.post('/user/add', async (req, res) => {
    const x = await userController.addUser(req.body)
    console.log(x)
    res.send(x)
})

router.post('/user/update', async (req, res) => {
    await userController.updateUser(req.body).then((response) => {
        console.log(response)
        return res.send(response)
    }).catch((error) => {
        console.log(error)
    })
})

router.post('/user/delete', async (req, res) => {
    await userController.deleteUser(req.body).then((response) => {
        return res.send(response)
    }).catch((error) => {
        console.log(error)
    })
})
module.exports = router
