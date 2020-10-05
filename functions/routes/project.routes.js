const project = require('../controllers/projects.controller.js');
const functions = require('firebase-functions');

//Create

exports.add = functions.https.onRequest(async (req, res) => {
    try {
        const result = await project.createProject(req);
        return res.send(result);
    } catch(error) {
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Read
exports.getOne = functions.https.onRequest(async (req, res) => {
    try{
        const result = await project.findByProjectId(req);
        return res.send(result);

    }catch(error) {
        console.log(error.message);
        return res.status(500).send({"error":error.message});
    }
});

exports.getByUser = functions.https.onRequest(async (req, res)=>{
    try{
        const result = await project.findByUserId(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Update
exports.update = functions.https.onRequest( async (req, res)=>{
    try{
        const result = await project.updateProject(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Delete
exports.delete = functions.https.onRequest( async (req, res)=>{
    try{
        const result = await project.delete(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});
