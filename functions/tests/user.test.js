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

describe('testing the test function', () => {
    var add = firebase.functions().httpsCallable('user-add');
    it('test function returning 6', () => {
        expect(user.basicTest()).toBe(6)
    })

    it('testing user add functions', async () => {
        const data = { 
            userId: "userd",
            name: "Stavya",
            bio: "i am Hot",
            email: "stavyadatta@gmail.com"
        }

        const message = await add(data)

        expect(message.data).toBe(`User ${data.name} has been added`)
    })
})
