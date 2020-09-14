const Project = require("../models/projects.model");

//create
exports.createProject = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"Request needs body"});
        return;
    };
    if(!req.body.projectName){
        res.status(400).send({message:"Project needs a name"});
        return;
    };

    req.body.userId = req.params.userId;
    
    Project.create(req.body, (err, data)=>{
        if(err){
                res.status(500).send({message:err.message||"Error creating project"});
        }else{
            res.status(200).send(data)
        }

    }).catch(error=>{res.send(error)});
}

//read
exports.findAllProjects = (req, res) => {
    Project.getAll((err, data) => {
        if(err){
            res.status(500).send({message:err.message||"Error fetching all projects"});
            return;
        };

        res.status(200).send(data);
    });
};

exports.findProjectByProjectId = (req, res) => {
    Project.getByProjectId(req.params.projectId, (err, data) => {
        if(err){
            if(err.kind = "not_found"){
                res.status(404).send({message:err.message});
                return;
            } else {
                res.status(500).send({message:err.message||`Error fetching project with ProjectID: ${req.params.projectId} projects`});
                return;
            }
        };

        res.status(200).send(data);
    });
};

exports.findProjectByUserId = (req, res) => {
    Project.getByUserId(req.params.userId, (err, data) => {
        if(err){
            if(err.kind = 'not_found'){
                res.status(404).send({message:err.message});
            } else {
                res.status(500).send({message:err.message||`Error fetching projects with UserID: ${req.params.projectId} projects`});
            }
        }else res.status(200).send(data);

    }).catch(err => console.log(err));
};

//update
exports.updateProjectById = async (req, res) => {
    Project.updateByProjectId(req.params.projectId, (err, data) => {
        if(!req.body){
            res.status(400).send({message:"Request needs body"});
            return;
        };

        if(err){
            if(err.kind = "not_found"){
                res.status(404).send({message:err.message});
                return;
            } else {
                res.status(500).send({message:err.message||`Error fetching projects with UserID: ${req.params.projectId} projects`});
                return;
            }
        };

        res.status(200).send(data);
    });
};

//delete
exports.deleteProjectByProjectId = (req, res) => {
    Project.deleteByProjectId(req.params.projectId, (err, data) => {
        if(err){
            if(err.kind = "not_found"){
                res.status(404).send({message:err.message});
                return;
            } else {
                res.status(500).send({message:err.message||`Error fetching project with ProjectID: ${req.params.projectId} projects`});
                return;
            }
        };

        res.status(200).send(data);
    });
};