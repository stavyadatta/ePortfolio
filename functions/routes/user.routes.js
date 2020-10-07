const userController = require('../controllers/user.controller.js')
const functions = require('firebase-functions');

exports.add = functions.https.onCall(async (data, context) => {
    const x = await userController.addUser(data)
    console.log(x)
    return x
})

exports.update = functions.https.onCall(async (data, context) => {
    try{
        let response = await userController.updateUser(data)
        return response
    }catch(error){
        return functions.https.HttpsError(error)
    }
})

exports.delete = functions.https.onCall(async (data, context) => {
    try{
        let response = await userController.deleteUser(data)
        return response
    }catch(error){
        return functions.https.HttpsError(error)
    }
})

exports.getOne = functions.https.onCall(async (data, context) => {
    try{
        let response = await userController.getUser(data)
        return response
    }catch(error){
        return functions.https.HttpsError(error)
    }
})
