const db = require("../dB/Firestore.js");

const Project = function(project) {
    this.projectName = project.projectName,
    this.projectDesc = project.projectDesc,
    this.userId = project.userId,
    this.projectBody = project.projectBody
};

Project.create = (newProject, result) => {

}

Project.getAll = (result) => {

}

Project.getByProjectId = (projectId, result) => {

}

Project.getByUserId = (userId, result) => {

}

Project.updateByProjectId = (projectId, result) => {

}

Project.deleteByProjectId = (projectId, result) => {

}




module.exports = Project;