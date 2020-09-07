const Firestore = require('@google-cloud/firestore');
const firebaseHelper = require('firebase-functions-helper/dist');


const db = new Firestore({
    projectId: 'impressive-hall-288310',
    keyFilename: '../ePortfolio-98216637d759.json',
  });

const users = db.collection('users');

//Create
const Project = function(project) {
    this.projectName = project.projectName,
    this.projectDesc = project.projectDesc,
    this.projectBody = project.projectBody,
    this.projectBody = project.projectTags,
    this.userId = project.userId
};

Project.create = async (newProject, result) => {
    const userId = newProject.userId;
    const userProjects = users.doc(userId);
    const project = new Project(newProject);

    const res = await userProjects.colletion('projects').add(project);

    console.log("Created project:", res.id, ", for user:", userId);

    result = (NULL, res);
}

//Read
Project.getAll = (result) => {

}

Project.getByProjectId = async (userId, projectId, result) => {
    const userProjects = users.doc(userId).collection('projects');
    const res = await projects.doc(projectId).get();

    if (res.empty) {
        console.log('No matching documents for user:', userId);
        result = (
            {kind:"no_projects", 
            message:"User has no projects"},
            NULL);
        return;
      };

    result = (NULL, res.docs);
}

Project.getByUserId = async (userId, result) => {
    const userProjects = users.doc(userId).collection('projects');
    
    const res = await projects.get();
    if (res.empty) {
        console.log('No matching documents for user:', userId);
        result = (
            {kind:'result_empty', 
            message:'User has no projects'},
            NULL);
        return;
      };

    result = (NULL, res.docs);
}

//tags is an array of up to 10 tags to filter by
Project.filterByTag = async (userId, tags, result) => {
    const userProjects = users.doc(userId).collection('projects');
    const res = await projects.where('tags', 'array-contains-any', tags).get();
    
    if (res.empty) {
    console.log('No matching documents for user:', userId, 'with tags:', tags);
    result = (
        {kind:"result_empty", 
        message:"No projects returned from query"},
        NULL);
    return;
    };

    result = (NULL, res.docs);
}

//Update
Project.updateByProjectId = async (userId, projectId, project, result) => {
    const userProjects = users.doc(userId).collection('projects');
    const res = await projects.doc(projectId).update(project);

    result = (NULL, res);
}

//Delete
Project.deleteByProjectId = async (userId, projectId, result) => {
    const userProjects = users.doc(userId).collection('projects');
    const res = await projects.doc(projectId).delete();

    result = (NULL, res);
}

module.exports = Project;