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
    async add(user) {
        const res = await userCollection.add(this.dataObject).then((res => {
            console.log("Added users", res.body)
        })).catch((err) => {
            console.log(err)
        })
    }
    async update(user){
        var newPostKey = firebase.database().ref().child('users').push().key;
        console.log(newPostKey)
        // console.log(document.forEach(doc => {
        //     console.log(doc.data())
        // }))
    }   
}
// const User(user) => {
//     this.name = user.name,
//     this.userId = user.id,
//     this.email = user.email,
//     this.bio = user.bio
// }

// User.add = async (user) => {
//     user = new User(user)
//     const res = await userCollection.add(user).then((res => {
//         console.log(res.name, "has been added")
//     })).catch((err) => {
//         console.log(err)
//     })
// }

// User.update = async (userUpdate) => {
//     const document = await userCollection.where('id', '==', userUpdate.id).then((res) => {
//         console.log(document)
//         // document.update(userUpdate).then((res) => {
//         //     console.log(document)
//         //     return res
//         // })
//         // return res
//     })
// }

// User.delete = async(userDelete) => {
//     const res = await userCollection.delete
// }

// // User.delete = async (id){

// // }

const object = {
    name: "testing4",
    id: "stavyadatta",
    email: "stavyadatta@gmail.com",
    bio: "I am CS student"
}

const some = new User(object)

const updateObject = {
    id: "stavyadatta",
    name: "Abhaya"
}

some.add()