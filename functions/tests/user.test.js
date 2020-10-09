const firebase_config = {
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
}
const test = require('firebase-functions-test')({
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
},'/home/stavyadatta/Documents/IT_Project/ePortfolio/functions/testingKey.json')
const admin = require('firebase-admin');
const firebase = require("firebase");
firebase.initializeApp(firebase_config);
firebase.functions().useFunctionsEmulator('http://localhost:5001') 

let user,adminStub;


beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    user = require('../routes/user.routes.js');
    return;
});

afterAll(() =>{
    adminStub.mockRestore();
});

describe('testing the user test function', () => {
    const add = firebase.functions().httpsCallable('user-add');
    const update = firebase.functions().httpsCallable('user-update');
    const del = firebase.functions().httpsCallable('user-delete');
    const getOne =  firebase.functions().httpsCallable('user-getOne');

    it('test function returning 6', () => {
        expect(user.basicTest()).toBe(6)
    })
    const dataAdd = { 
        userId: "userd",
        name: "Stavya",
        bio: "i am Hot",
        email: "stavyadatta@gmail.com"
    }
    const dataUpdate = {
        userId: "userd",
        name: "Stavya2",
        bio: 'I am cool'
    }
    const dataDelete = {
        userId: "userd"
    }
    const dataGet = dataDelete

    it('testing user add functions', async () => {
        const message = await add(dataAdd)

        expect(message.data).toBe(`User ${dataAdd.name} has been added`)

    })
    
    it('testing user update ', async () => {
        const message = await update(dataUpdate)
        expect(message.data).toBe(`User ${dataUpdate.userId} updated`)
    })

    it('testing user getOne function', async () => {
        const message = await getOne(dataGet)
        expect(message.data).toMatchObject({
            "bio": "I am cool", 
            "email": "stavyadatta@gmail.com", 
            "name": "Stavya2", 
            "userId": "userd"})
    })
    it('testing user delete', async () => {
        const message = await del(dataDelete)
        expect(message.data).toBe(`deleted User ${dataDelete.userId}`)
    })
    
})
