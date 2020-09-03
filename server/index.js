const express = require('express')
const userDB = require('./db/userDB.js')
const app = new express()

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send("Hello World")
})

// app.listen(3000, () => {
//     console.log("listening on 3000")
// })
const testObj = {password: 886094}


//userDB.updatingData(testObj, 'Stavya')
userDB.deleteData("Te")

