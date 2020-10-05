const Project = require("../models/projects.model");

//create
exports.createProject = async (req) => {
        const data = req.body
        try{
            validateAdd(data);

            const project = new Project(data);

            let res = await project.create();

            return res;

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
    return await Project.getByProjectId(req.body.projectId);
};

exports.findByUserId = async (req) => {
    return await Project.getByUserId(req.body.userId);
};

//update
exports.updateProject = async (req) => {
    try{
        let data = req.body;
        const project = new Project(data);

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
    if(!data.projectId){
        throw new Error("No projectId")
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
        let res = await Project.deleteById(req.body.projectId);
        let check = await Project.getByProjectId(req.body.projectId);
        console.log(check);
        if(check.not_found){
            return {
                message:`Project projectId: ${req.body.projectId} deleted`
            }
        } else {
            return {
                message:`Project projectId: ${req.body.projectId} could not be deleted`,
                error:'delete_error'
            }
        }
    } catch (error){
        throw error;
    }
};