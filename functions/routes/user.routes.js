const userController = require('../controllers/user.controller.js')
const functions = require('firebase-functions');


exports.add = functions.https.onCall(async (data, context) => {
    try{
        const response = await userController.addUser(data)
        console.log(response)
        return response
    }catch(error){
        return functions.https.HttpsError(500, error)
    }
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
        //console.log(process.env)
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
        return functions.https.HttpsError(500, error);
    }
})

// this is testing the test function 

exports.basicTest = function(){
    const a = 1;
    const b = 5;
    return a + b;
}
