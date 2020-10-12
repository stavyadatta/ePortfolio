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
const HOST = process.env.PORT||'http://localhost:5001'
firebase.functions().useFunctionsEmulator(HOST) 

let user,adminStub;


beforeAll(() =>{
    adminStub = jest.spyOn(admin, 'initializeApp');
    user = require('../routes/project.routes.js');
    return;
});

afterAll(() =>{
    adminStub.mockRestore();
});

//describe('testing the projects function', () => {
    const add = firebase.functions().httpsCallable('project-add');
    const update = firebase.functions().httpsCallable('project-update')

    const addData = {
        userId: 'Josh',
        projectName: 'TestProject'
    }
    let projectId =''
    // const updateData = {
    //     userId: 
    // }

    it('testing add project function', async () => {
        const message = await add(addData)
        projectId = message.data.projectId
        expect(message.data.userId).toBe(addData.userId)
    })

    it('testing update project function', async () => {
        console.warn(projectId)
        const message = await update({ "projectId": projectId, "bio": 'stavya'})
        expect(message.data).toBe({result: `Project ${projectId} updated`})
    })
//})