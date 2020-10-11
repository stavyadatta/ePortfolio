const firebase_config = {
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
}

const admin = require('firebase-admin');
const firebase = require("firebase");
firebase.initializeApp(firebase_config);
firebase.functions().useFunctionsEmulator('http://localhost:5001') 

let user,adminStub;


beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    user = require('../routes/project.routes.js');
    return;
});

afterAll(() =>{
    adminStub.mockRestore();
});

describe('testing the projects function', () => {
    const add = firebase.functions().httpsCallable('project-add');

    const addData = {
        userId: 'Josh',
        projectName: 'TestProject'
    }

    it('testing add project function', async () => {
        const message = await add(addData)
        expect(message.data.userId).toBe(addData.userId)
    })
})