const express = require('express');
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(port, () => {
	console.log('listening on ' + port);
});
