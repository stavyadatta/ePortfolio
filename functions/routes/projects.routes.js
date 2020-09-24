module.exports = app => {
    const project = require('../controllers/projects.controller.js');

    app.post(
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

    app.get(
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

    app.get(
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

    app.put(
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

    app.delete(
        '/user/:userId/project/:projectId', 
        (req, res)=>{
            res.send(project.delete(req))
        }
    )
}

