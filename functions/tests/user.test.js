const test = require('firebase-functions-test')({
    databaseURL: "https://impressive-hall-288310.firebaseio.com",
    storageBucket: "impressive-hall-288310.appspot.com",
    projectId: "impressive-hall-288310"
},'/home/stavyadatta/Documents/IT_Project/ePortfolio/functions/testingKey.json')
const admin = require('firebase-admin');

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
    it('test function returning 6', () => {
        expect(user.basicTest()).toBe(6)
    })
})
