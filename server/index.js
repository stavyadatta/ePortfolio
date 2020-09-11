const express = require('express')
const addUser = require('./controllers/userController.js')
const app = new express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user/add', (req, res) => {
    res.send(addUser(req.body))
})

app.post('/user/update', (req, res) => {
    res.send()

})


app.listen(port, () => {
    console.log("listening on " + port)
})
//const testObj = {password: 886094}


//userDB.updatingData(testObj, 'Stavya')

