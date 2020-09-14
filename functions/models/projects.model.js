const admin = require("firebase-admin");

var serviceAccount = require(__dirname+'/impressive-hall-288310-1d73c8a9acc8.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://impressive-hall-288310.firebase.io'
  });

const db = admin.firestore();
const users = db.collection('users');

//Create and Update
class Project{
    constructor(project){
        this.userId = project.userId;
        delete project.userId;

        this.dataObject = project;
        this.userRef = users.doc(this.userId);
        this.projects = this.userRef.collection('projects');
    }

    create() {
        this.projects.add(this.dataObject).catch(err=>{throw err});
    }

    update() {
        this.projects.update(this.dataObject).catch(err=>{throw err});
    }

};

//Read
Project.getAll = (result) => {
    return "YES"

}

Project.getByProjectId = async (userId, projectId) => {
    const userProjects = users.doc(userId).collection('projects');
    const res =  await userProjects.doc(projectId).get();

    if (res.empty) {
        return 'No matching documents for user:' + userId;
    } else {
        return res.data();
    }
}

Project.getByUserId = async (userId) => {    
    const snapshot = await users.doc(userId).collection('projects').get();
    
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
        users.doc(userId)
        .collection('projects').doc(projectId)
        .delete().then(
            console.log('Project Deleted'), 
            e=>console.log(e.message));
}

module.exports = Project;