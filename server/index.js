<<<<<<< HEAD
const express = require('express');
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
	res.render('index.html');
});
=======
const express = require('express')
const userDB = require('./db/userDB.js')
const app = new express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user/add', (req, res) => {
    userDB.addUser(req.body, "test3").then((user) => {
        res.send("Added")
    }).catch((err) => {
        res.send(err)
    })
})

app.post('/user/update', (req, res) => {
    userDB.updateUser(req.body, "random").then((user) => {
        res.send("Updated")
    }).catch((err) => {
        res.send(err)
    })

})


app.listen(port, () => {
    console.log("listening on " + port)
})
//const testObj = {password: 886094}


//userDB.updatingData(testObj, 'Stavya')
>>>>>>> ced119aed601001b496966f3f7af612b791bcbf4

app.listen(port, () => {
	console.log('listening on ' + port);
});
