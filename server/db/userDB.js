const Firestore = require('@google-cloud/firestore')

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
// const snapshot = await db.collection('users').get();
// snapshot.forEach((doc) => {
//   console.log(doc.id, '=>', doc.data());
// });

module.exports = {
    addingData: addingData,
    updatingData: updatingData
}