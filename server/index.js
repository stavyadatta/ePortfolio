const express = require('express')
const bodyParser = require('body-parser')
const app = new express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./routes/projects.routes.js')(app);

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send("Hello World")
})


app.listen(3000, () => {
    console.log("listening on 3000")
})


