const admin = require("firebase-admin");

var serviceAccount = require(__dirname+'/impressive-hall-288310-1d73c8a9acc8.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://impressive-hall-288310.firebase.io'
  });

const db = admin.firestore();
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
    try{
        //Check if user exists first
        doc = await userProjects.get();

        if(!doc.exists){
            result({
                kind:"not_found", 
                message:"User does not exist"
            }, null);
            return;
        }

    
        res = await userProjects.collection('projects').add(newProject);
        console.log("Created project:", res.id, ", for user:", userId);
        result(null, {message:"Created project:"+res.id+", for user:"+userId});
    } catch(error) {
        result(error, null);
    }
}

//Read
Project.getAll = (result) => {

}

Project.getByProjectId = async (userId, projectId, result) => {
    try{
        const userProjects = users.doc(userId).collection('projects');
        const res = await userProjects.doc(projectId).get();

        if (res.empty) {
            console.log('No matching documents for user:', userId);
            result(
                {kind:"not_found", 
                message:"User has no projects"},
                null);
            return;
        };

        result(null, res.docs.map(doc => doc.data()));
    } catch(error) {
        result(error, null);
    }
}

Project.getByUserId = async (userId, result) => {
    try{
        const userProjects = users.doc(userId).collection('projects');
    
        const res = await(await userProjects.get()).docs;
        if (res.empty) {
            console.log('No matching documents for user:', userId);
            result(
                {kind:'not_found', 
                message:'User has no projects'},
                null);
        } else result(null, res); 
    } catch(error) {
        result(error, null);
    }

}
//tags is an array of up to 10 tags to filter by
Project.filterByTag = async (userId, tags, result) => {
    try{
        const userProjects = users.doc(userId).collection('projects');
        const res = await userProjects.where('tags', 'array-contains-any', tags).get();
        
        if (res.empty) {
            console.log('No matching documents for user:', userId, 'with tags:', tags);
            result(
                {kind:"not_found", 
                message:"No projects returned from query"},
                null);
            return;
        };

        result(null, res.docs);
    } catch(error) {
        result(error, null);
    }
}

//Update
Project.updateByProjectId = async (userId, projectId, project, result) => {
    try {
        const userProjects = users.doc(userId).collection('projects');
        const res = await userProjects.doc(projectId).update(project);

        result(null, res);
    }catch(error) {
        result(error, null);
    }
}

//Delete
Project.deleteByProjectId = async (userId, projectId, result) => {
    try{
        const userProjects = users.doc(userId).collection('projects');
        const res = await userProjects.doc(projectId).delete();

        result(null, res);
    } catch(error) {
        result(error, null);
    }
}

module.exports = Project;