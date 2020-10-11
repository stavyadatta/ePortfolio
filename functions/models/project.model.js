const admin = require('./firebase.admin');
const db = admin.firestore();
projects = db.collection('projects');

//Create and Update
class Project{
    constructor(project){
        this.dataObject = project;
        this.projectId = ""
    }

    async create() {
        try{
            const result = await projects.add(this.dataObject);
            return {projectId: result.id, userId: this.dataObject.userId};
        }catch(error){
            throw error;
        }
    }

    async update() {
        try{
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
    if (!res) {
        return {
            error: 'not_found',
            message:`No matching documents with projectID: ${projectId}`
        };
    } else {
        const data = res.data();
        data.projectId = projectId;
        return data;
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
            res[i] = doc.data();
            res[i].projectId = doc.id;
            i++;
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
Project.deleteById = async (projectId) => {
    try{
        await projects.doc(projectId).delete();
    } catch(error){
        console.log(error.message)
        throw error
    }
}

module.exports = Project;
