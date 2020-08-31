const express = require('express')
const app = new express()

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("listening on 3000")
})


