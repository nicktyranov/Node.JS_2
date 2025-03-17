import express from 'express';

let app = express();

app.get('/', function (req, res) {
	res.send('it works');
});

app.listen(3000, function () {
	console.log('running');
});
