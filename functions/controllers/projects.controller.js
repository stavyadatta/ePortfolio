const Project = require("../models/projects.model");

//create
exports.createProject = async (req) => {
        const data = req.body
        try{
            validateAdd(data);

            const project = new Project(data);

            await project.create();

            return {message: "Project: "+project.dataObject.projectName+" created for user: "+project.dataObject.userId};

        }catch(err){throw err}
}

function validateAdd(data){
    res = true;
    if(!data){
        res = false;
        throw new Error("No data");
    }
    if(!data.userId){
        res =  false;
        throw new Error("No userId");
    }
    if(!data.projectName){
        res =  false;
        throw new Error("No projectName");
    }
    return res;
}

/*
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
*/

exports.findByProjectId = async (req) => {
    return await Project.getByProjectId(req.params.projectId);
};

exports.findByUserId = async (req) => {
    return await Project.getByUserId(req.params.userId);
};

//update
exports.updateProject = async (req) => {
    try{
        let data = req.body;
        const project = new Project(data);
        project.projectId = req.params.projectId

        validateUpdate(data);

        return await project.update();
    } catch(error){
        throw error;
    }
}

function validateUpdate(data){
    res = true;
    if(!data){
        res = false;
        throw new Error("No data");
    }
    if(data.userId){
        res =  false;
        throw new Error("Cannot update userId");
    }
    return res;
}

//delete
exports.delete = async (req) => {
    try {
        await Project.deleteById(req.params.userId, req.params.projectId);

    } catch (error){
        throw error;
    }
};