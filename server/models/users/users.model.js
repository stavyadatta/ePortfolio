const Firestore = require('@google-cloud/firestore')
const admin = require('firebase-admin')


const db = new Firestore({
    projectId: 'impressive-hall-288310',
    keyFilename: '../../../ePortfolio-98216637d759.json',
});

const userCollection = db.collection('users');

class User {
    
    constructor(user){
        this.dataObject = {
            name: user.name,
            userId: user.id,
            email: user.email,
            bio: user.bio
        }
    }
    async add() {
        const res = await userCollection.add(this.dataObject).then((res => {
            console.log("Added users", res.body)
        })).catch((err) => {
            console.log(err)
        })
    }
    static async searchUser(userId) {
        return await userCollection.where('userId', '==', userId).get();
    }
    async update(updateObject){
        const data = await User.searchUser(this.dataObject.userId)
        data.forEach(doc => {
            const res = userCollection.doc(doc.id).update(updateObject.data)
        })
    }
    async delete() {
        const data = await User.searchUser(this.dataObject.userId)
        console.log(this.dataObject.userId)
        if (data.empty) {
            console.log("empty")
        }
        console.log("Prinitng in delete")
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

const object = {
    name: "Abhaya",
    id: "stavyadatta",
    email: "stavyadatta@gmail.com",
    bio: "I am CS student"
}

const some = new User(object)

const updateObject = {
    userId: "stavyadatta",
    data: {
        name: "kshikitj"
    }
}


some.update(updateObject)