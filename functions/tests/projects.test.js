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
},path.join(__dirname, '../serviceAccountKey.json'))


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
const getByUser = firebase.functions().httpsCallable('project-getByUser')
const deleteProj = firebase.functions().httpsCallable('project-delete')
const getOne = firebase.functions().httpsCallable('project-getOne')

const addData = {
    userId: 'Josh',
    projectName: 'TestProject'
}
let projectId =''

const userIdObj = {
    userId: 'Josh'
}


it('testing add project function', async () => {
    const message = await add(addData)
    projectId = message.data.projectId
    console.log(projectId)
    expect(message.data.userId).toBe(addData.userId)
})

it('testing getByUser function', async () => {
    const message = await getByUser(userIdObj)
    for (i = 0; i < message.data.length; i++) {
        expect(message.data[i].userId).toBe(userIdObj.userId)
    }
})

it('testing getOne Project function', async () => {
    const message = await getOne({projectId: projectId})
    expect(message.data.userId).toBe(addData.userId)
})
it('testing update project function', async () => {
    const message = await update({ "projectId": projectId.toString(), "bio": 'Stavya'})
    expect(message.data).toBe(`Project projectId: ${projectId} updated`)
})

// it('testing delete function', async() => {
//     const message = await deleteProj({projectId: projectId})
//     expect(message.data.message).toBe(`Project projectId: ${projectId} deleted`)
// })






    
//})