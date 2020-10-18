const project = require('../controllers/project.controller.js');
const functions = require('firebase-functions');

//Create

exports.add = functions.https.onCall(async (data, context) => {
    try {
        const result = await project.createProject(data);
        return result;
    } catch(error) {
        throw new Error(error);
    }
});

//Read
exports.getOne = functions.https.onCall(async (data, context) => {
    try{
        const result = await project.findByProjectId(data);
        return result;
    }catch(error) {
        console.log(error.message);
        throw new functions.https.HttpsError(error);
    }
});

exports.getByUser = functions.https.onCall(async (data, context)=>{
    try{
        const result = await project.findByUserId(data);
        return result;
    }catch(error){
        console.log(error.message);
        throw new functions.https.HttpsError(error);
    }
});

//Update
exports.update = functions.https.onCall(async (data, context)=>{
    try{
        const result = await project.updateProject(data);
        return result;
    }catch(error){
        console.log(error.message);
        throw new functions.https.HttpsError(error);
    }
});

//Delete
exports.delete = functions.https.onCall(async (data, context)=>{
    try{
        const result = await project.delete(data);
        return result;
    }catch(error){
        console.log(error.message);
        throw new functions.https.HttpsError(error);
    }
});
