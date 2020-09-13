const Firestore = require('@google-cloud/firestore')
const admin = require('firebase-admin')


const db = new Firestore({
    projectId: 'impressive-hall-288310',
    keyFilename: 'ePortfolio-98216637d759.json',
});

const userCollection = db.collection('users');

class User {
    
    constructor(user){
        this.dataObject = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            bio: user.bio
        }
    }
    async add() {
        const res = await userCollection.add(this.dataObject).then((res => {
            console.log("Added users", res.body)
        })).catch((err) => {
            throw err
        })
    }
    static async searchUser(userId) {
        return await userCollection.where('userId', '==', userId).get();
    }
    static async update(updateObject){
        const data = await User.searchUser(updateObject.update.userId)
        if (data.empty) {
            console.log("empty data")
            return;
        }
        data.forEach(doc => {
            const res = userCollection.doc(doc.id).update(updateObject.update.updateData).then((res) => {
                return "Updated"
            })
        })
    }
    static async delete(userData) {
        const data = await User.searchUser(userData.userId)
        if (data.empty) {
            console.log("empty data")
            return;
        }
        data.forEach(doc => {
            console.log(doc.id)
            const res = userCollection.doc(doc.id).delete().then((res) => {
                console.log("deleted")
            }).catch((err) => {
                console.log(err)
            })
        })
    }
}

module.exports = User