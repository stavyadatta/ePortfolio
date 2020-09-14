module.exports = app => {
    const project = require('../controllers/projects.controller.js');

    app.post(
        '/user/:userId/project',
        project.createProject
    );

    app.get(
        '/user/:userId/project/:projectId', 
        project.findProjectByProjectId
    );

    app.get(
        '/user/:userId/project', 
        project.findProjectByUserId
    );

    app.put(
        '/user/:userId/project/:projectId', 
        project.updateProjectById
    );

    app.delete(
        '/user/:userId/project/:projectId', 
        project.deleteProjectByProjectId
    );
}

