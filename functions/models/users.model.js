const admin = require('./firebase.admin');

const db = admin.firestore();

const userCollection = db.collection('users');

class User {
    
    constructor(user){
        this.dataObject = {
            firstName: user.firstName,
            email: user.email,
            lastName: user.lastName
        }
        this.userId = user.userId
    }
    async add() {
        return await userCollection.doc(this.userId).set(this.dataObject).catch((err) => {
            throw err
        })
    }
    static async searchUser(userId) {
        return await userCollection.doc(userId).get();
    }

    static async readUser(userId) {
        const user = await User.searchUser(userId).catch((err) => {
            throw err
        })
        console.log(user.data())
        return await user.data()
    }
    static async update(updateObject){
        const data = await User.searchUser(updateObject.update.userId)
        return await userCollection.doc(data.id).update(updateObject.update.updateData).catch((err) => {
            throw err
        })
    }
    static async delete(userData) {
        const data = await User.searchUser(userData.userId)
        return await userCollection.doc(data.id).delete().catch((err) => {
            throw err
        })     
    }
}

module.exports = User;
