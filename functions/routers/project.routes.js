const project = require('../controllers/projects.controller.js');
const express = require('express');
const router = new express.Router();

//Create
router.post('/project', async (req, res) => {
    try {
        const result = await project.createProject(req);
        return res.send(result);
    } catch(error) {
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Read
router.get('project/:projectId', async(req, res) => {
    try{
        const result = await project.findByProjectId(req);
        return res.send(result);

    }catch(error) {
        console.log(error.message);
        return res.status(500).send({"error":error.message});
    }
});

router.get('/user/:userId/project', async (req, res)=>{
    try{
        const result = await project.findByUserId(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Update
router.put('/project/:projectId', async (req, res)=>{
    try{
        const result = await project.updateProject(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

//Delete
router.delete('/project/:projectId', async (req, res)=>{
    try{
        const result = await project.delete(req);
        return res.send(result);
    }catch(error){
        console.log(error.message);
        return res.status(500).send({"error":error.message})
    }
});

module.exports = router;