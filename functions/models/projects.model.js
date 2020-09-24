const admin = require("firebase-admin");

serviceAccount = require('../../impressive-hall-288310-1d73c8a9acc8.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://impressive-hall-288310.firebase.io'
  });

const db = admin.firestore();
projects = db.collection('projects');

//Create and Update
class Project{
    constructor(project){
        this.dataObject = project;
    }

    async create() {
        return await projects.add(this.dataObject)
            .catch(err=>{throw err});
    }

    async update() {
        return await projects.update(this.dataObject).catch(err=>{throw err});
    }

}

//Read
Project.getAll = (result) => {
    return "YES"

}

Project.getByProjectId = async (userId, projectId) => {
    const res =  await projects.doc(projectId).get();

    if (res.empty) {
        return 'No matching documents for user:' + userId;
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