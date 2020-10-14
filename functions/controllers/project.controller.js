const Project = require("../models/project.model");

//create
exports.createProject = async (data) => {
        try{
            validateAdd(data);

            const project = new Project(data, "");

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

exports.findByProjectId = async (data) => {
    return await Project.getByProjectId(data.projectId);
};

exports.findByUserId = async (data) => {
    return await Project.getByUserId(data.userId);
};

//update
exports.updateProject = async (data) => {
    try{
        validateUpdate(data);

        let updateData = {};
        let projectId = "";
        let keys = Object.keys(data);
        keys.forEach(element => {
            if(element === "projectId")
                projectId = data.projectId;
            else
                updateData[element] = data[element];
        });
        const project = new Project(updateData, projectId);


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
exports.delete = async (data) => {
    try {
        let res = await Project.deleteById(data.projectId);
            return {
                message:`Project projectId: ${data.projectId} deleted`
            }
    } catch (error){
        throw error;
    }
};