const userController = require('../controllers/userController.js')
const functions = require('firebase-functions');

exports.add = functions.https.onRequest(async (req, res) => {
    const x = await userController.addUser(req.body)
    console.log(x)
    res.send(x)
})

exports.update = functions.https.onRequest(async (req, res) => {
    await userController.updateUser(req.body).then((response) => {
        console.log(response)
        return res.send(response)
    }).catch((error) => {
        return res.send(error)
    })
})

exports.delete = functions.https.onRequest(async (req, res) => {
    await userController.deleteUser(req.body).then((response) => {
        return res.send(response)
    }).catch((error) => {
        throw error
    })
})

exports.getOne = functions.https.onRequest(async(req, res) => {
    await userController.getUser(req.body).then((response) => {
        return res.send(response)
    }).catch((error) => {
        throw error
    })
})
module.exports = router
