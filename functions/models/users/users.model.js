const admin = require('../firebase.admin');

const db = admin.firestore();

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
        return await userCollection.add(this.dataObject).catch((err) => {
            throw err
        })
    }
    static async searchUser(userId) {
        return await userCollection.where('userId', '==', userId).get();
    }
    static async readUser(userId) {
        const user = await User.searchUser(userId)
        let returnObject = {}
        // console.log(user, "User in model")
        if (user.empty){
            //throw new Error("No user with such userId")
            return "No user with such userId"
        } else {
            user.forEach(user => {
                returnObject = user.data()
            })
            return returnObject
        }
    }
    static async update(updateObject){
        const data = await User.searchUser(updateObject.update.userId)
        if (data.empty) {
            console.log("empty data")
            return "Empty data";
        } else {
            data.forEach(doc => {
                const res = userCollection.doc(doc.id).update(updateObject.update.updateData)
            })
            return "Updated"
        }
    }
    static async delete(userData) {
        const data = await User.searchUser(userData.userId)
        if (data.empty) {
            console.log("empty")
            return false
        } else {
            data.forEach(async (doc) => {
                console.log(doc.id)
                const res = await userCollection.doc(doc.id).delete().catch((err) => {
                    console.log(err)
                    throw err
                })
            })
            return `deleted`
        }
            
    }
}

module.exports = User;
