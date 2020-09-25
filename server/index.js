const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(port, () => {
	console.log('listening on ' + port);
});
app.use(express.static(path.join(__dirname, 'scripts')));
