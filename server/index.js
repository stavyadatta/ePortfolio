const express = require('express')
const userController = require('./controllers/userController.js')
const app = new express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user/add', (req, res) => {
    res.send(userController.addUser(req.body))
})

app.post('/user/update', (req, res) => {
    userController.updateUser(req.body).then((response) => {
        console.log(response)
        res.send(response)

    })
})

app.post('/user/delete', (req, res) => {
    userController.deleteUser(req.body).then((response) => {
        res.send(response)
    })
})


app.listen(port, () => {
    console.log("listening on " + port)
})
//const testObj = {password: 886094}


//userDB.updatingData(testObj, 'Stavya')

