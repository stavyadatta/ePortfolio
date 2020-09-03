const Firestore = require('@google-cloud/firestore')
const admin = require('firebase-admin')
admin.initializeApp()

const db = new Firestore({
    projectId: 'impressive-hall-288310',
    keyFilename: '../ePortfolio-98216637d759.json',
  });

//   const docRef = db.collection('users').doc('Test1')

//   docRef.set({
//       name: "test1",
//       email: "test1@example.com",
//       company: 'xyz',
//       phoneNumber: "xxxyyyzzzz"  
//   })

// checks if the object has the fields as required in the object 

function checkingObject(data){
    if (data.hasOwnProperty('name', 'email', 'password', 'bio')){
        return true
    } else {
        return false
    }
}

async function addingData(data, name){
    const res = await db.collection('users').doc(name).set(data).then((res) => {
        console.log("Successfully added", name)
        return res
    }).catch((err) => {
        console.log(err)
    })
}

// updating array fields in a document (The data needs to be under a single datatye)
async function updatingArray(data, name, parameter){
    const res = await db.collection('users').doc(name).update({
        [parameter]: admin.firestore.FieldValue.arrayUnion(data)
    })
}

// updates name of the id with a given object
async function updatingData(data, name){
    const res = await db.collection('users').doc(name).update(data).then((res) => {
        console.log("Successfully updated", name)
        return res
    }).catch((err) => {
        console.log(err)
    })
}

async function demoInitialize(db) {
    const snapshot = await db.collection('users').get()
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
    })
}

// deletion of documents

async function deleteData(name){
    const res = await db.collection('users').doc(name).delete().then((res) => {
        console.log("Successfully Deleted", name)
        return res
    }).catch((err) => {
        console.log(err)
    })
}
// const snapshot = await db.collection('users').get();
// snapshot.forEach((doc) => {
//   console.log(doc.id, '=>', doc.data());
// });

module.exports = {
    addingData: addingData,
    updatingData: updatingData,
    updatingArray: updatingArray,
    deleteData: deleteData
}