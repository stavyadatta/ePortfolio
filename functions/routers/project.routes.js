const project = require('../controllers/projects.controller.js');
const express = require('express');
const router = new express.Router();

router.post(
    '/project',
    async (req, res) => {
        project.createProject(req).then(
            result=>res.send(result),
            error=>{
                console.log(error.message);
                res.status(500).send({"error":error.message})
            }
            );
    }
);

router.get(
    '/user/:userId/project/:projectId', 
    async (req, res)=>{
        project.findByProjectId(req).then(
            result=>res.send(result),
            error=>{
                console.log(error.message);
                res.status(500).send({"error":error.message})
            }
        )
    }
);

router.get(
    '/user/:userId/project', 
    async (req, res)=>{
        project.findByUserId(req).then(
            result=>res.send(result),
            error=>{
                console.log(error.message);
                res.status(500).send({"error":error.message})
            }
        )
    }
);

router.put(
    '/user/:userId/project/:projectId', 
    (req, res)=>{
        project.updateProject(req).then(
            result=>res.send(result),
            error=>{
                console.log(error.message);
                res.status(500).send({"error":error.message})
            }
        )
    }
);

router.delete(
    '/user/:userId/project/:projectId', 
    (req, res)=>{
        res.send(project.delete(req))
    }
)


module.exports = router;