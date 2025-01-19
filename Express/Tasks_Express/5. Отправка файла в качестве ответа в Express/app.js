import express from 'express';
import __dirname from './dirname.js';


let app = express();
app.get('/', function(req, res) {
	res.status(403).send('hello world');
}).listen(3000, function() {
	console.log('running');
});


app.get('/example.json', (req, res) => {
	res.type('application/json');
	res.sendFile(__dirname + '/example.json');
});

app.get('/page/1/', (req, res) => {
	console.log(req.url);
	console.log(__dirname);
	res.type('text/html');
	res.sendFile(__dirname + '/pages/1.html');
});

app.get('/page/2/', (req, res) => {
	console.log(req.url);
	console.log(__dirname);
	res.type('text/html');
	res.sendFile(__dirname + '/pages/2.html');
});

app.get('/page/3/', (req, res) => {
	console.log(req.url);
	console.log(__dirname);
	res.type('text/html');
	res.sendFile(__dirname + '/pages/3.html');
});

app.use(function(req, res) {
	res.status(404).send('404 error - not found');
});

// №1⊗ndExBsFl
// Сделайте так, чтобы по пути /page/1/ отдавался файл pages/1.html, по пути /page/2/ - файл pages/2.html, а по пути /page/3/ - файл pages/3.html.