const path = require('path')
const firebase_config = {
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
}
const test = require('firebase-functions-test')({
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
}, path.join(__dirname, '../serviceAccountKey.json'))

const admin = require('firebase-admin');
const firebase = require("firebase");
firebase.initializeApp(firebase_config);

const HOST = process.env.PORT||'http://localhost:5001'
firebase.functions().useFunctionsEmulator(HOST) 

let user,adminStub;


beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    user = require('../routes/user.routes.js');
    return;
});

afterAll(() =>{
    adminStub.mockRestore();
});

const add = firebase.functions().httpsCallable('user-add');
const update = firebase.functions().httpsCallable('user-update');
const del = firebase.functions().httpsCallable('user-delete');
const getOne =  firebase.functions().httpsCallable('user-getOne');

const dataAdd = { 
    userId: "userd",
    firstName: "Stavya",
    lastName: "Datta",
    email: "stavyadatta@gmail.com"
}
const dataUpdate = {
    userId: "userd",
    firstName: "Stavya2",
}
const dataDelete = {
    userId: "userd"
}
const dataGet = dataDelete

it('testing user add functions', async () => {
    const message = await add(dataAdd)

    expect(message.data).toBe(`User ${dataAdd.firstName} has been added`)

})

it('testing user update ', async () => {
    const message = await update(dataUpdate)
    expect(message.data).toBe(`User ${dataUpdate.userId} updated`)
})

it('testing user getOne function', async () => {
    const message = await getOne(dataGet)
    expect(message.data).toMatchObject({
          firstName: "Stavya2",
          lastName: "Datta",
          email: "stavyadatta@gmail.com"
        })
})
it('testing user delete', async () => {
    const message = await del(dataDelete)
    expect(message.data).toBe(`deleted User ${dataDelete.userId}`)
})

