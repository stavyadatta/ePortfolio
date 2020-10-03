const admin = require('firebase-admin');
const serviceAccount = require('../../firebase.config');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.firebase_key),
    databaseURL: 'https://impressive-hall-288310.firebase.io'
  });

const db = admin.firestore();
projects = db.collection('projects');

//Create and Update
class Project{
    projectId;
    constructor(project){
        this.dataObject = project;
    }

    async create() {
        try{
            const result = await projects.add(this.dataObject);
            return `Project projectId: ${this.dataObject.projectId} 
                    created for user userId: ${this.dataObject.userId}`;
        }catch(error){
            throw error;
        }
    }

    async update() {
        try{
            console.log(this.dataObject);
            const result = await projects.doc(this.projectId).update(this.dataObject);
            return `Project projectId: ${this.projectId} updated`;
        }catch(error){
            throw error;
        }
    }
}

//Read
Project.getByProjectId = async (projectId) => {
    const res =  await projects.doc(projectId).get();

    if (res.empty) {
        return 'No matching documents with projectID: ' + projectId;
    } else {
        return res.data();
    }
}

Project.getByUserId = async (userId) => {    
    const snapshot = await projects.where("userId","==", userId).get();
    
    if (snapshot.empty) {
        return 'No matching documents for user:' + userId;
    } else{
        const res = [];
        let i = 0;
        snapshot.forEach(doc => {
            console.log(doc.data());
            res[i++] = doc.data();
        })

        return res;
    } 
}

/*
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
*/

//Delete
Project.deleteById = (userId, projectId) => {
        projects.doc(projectId)
        .delete()
        .then(console.log('Project Deleted'))
        .catch(e=>console.log(e.message));
}

module.exports = Project;