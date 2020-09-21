module.exports = app => {
    const project = require('../controllers/projects.controller.js');

    app.post(
        '/user/:userId/project',
        async (req, res) => {
            res.send(project.createProject(req)).catch(e=>console.log(e));
        }
    );

    app.get(
        '/user/:userId/project/:projectId', 
        async (req, res)=>{
            res.status(200).send(await project.findByProjectId(req));
        }
    );

    app.get(
        '/user/:userId/project', 
        async (req, res)=>{
            res.status(200).send(await project.findByUserId(req));
        }
    );

    app.put(
        '/user/:userId/project/:projectId', 
        (req, res)=>{
            res.status(200).send(project.updateProject(req));
        }
    );

    app.delete(
        '/user/:userId/project/:projectId', 
        (req, res)=>{
            res.send(project.delete(req));
        }
    );
}

