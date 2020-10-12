const Project = require("../models/project.model");

//create
exports.createProject = async (data) => {
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

exports.findByProjectId = async (data) => {
    return await Project.getByProjectId(data.projectId);
};

exports.findByUserId = async (data) => {
    console.log(data.userId + 'at the controller')
    return await Project.getByUserId(data.userId);
};

//update
exports.updateProject = async (data) => {
    try{
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
exports.delete = async (data) => {
    try {
        console.log(data.projectId + ' the projectId to delete')
        let res = await Project.deleteById(data.projectId);
        // let check = await Project.getByProjectId(data.projectId);
        //console.log(check);
        //if(check.not_found){
            return {
                message:`Project projectId: ${data.projectId} deleted`
            }
        // } else {
        //     return {
        //         message:`Project projectId: ${data.projectId} could not be deleted`,
        //         error:'delete_error'
        //     }
        // }
    } catch (error){
        throw error;
    }
};