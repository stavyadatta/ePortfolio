const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
    projectId: 'impressive-hall-288310',
    keyFilename: '../ePortfolio-98216637d759.json',
  });

  const docRef = db.collection('users').doc('Test1')

  docRef.set({
      name: "test1",
      email: "test1@example.com",
      company: 'xyz',
      phoneNumber: "xxxyyyzzzz"  
  })