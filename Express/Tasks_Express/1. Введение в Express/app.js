import express from 'express';

// №1⊗ndExBsInr
// Установите Express и проверьте его работу с помощью описанного выше кода.

let app = express();
app.get('/', function(req, res) {
	res.send('hello world');
}).listen(3000, function() {
	console.log('running');
});

// №2⊗ndExBsInr
// Сделайте пять различных урлов, по которым будет отдаваться какой-нибудь текст.
app.get('/1/', function(req, res) {
	res.send('page1');
});

app.get('/2/', function(req, res) {
	res.send('page2');
});

app.get('/3/', function(req, res) {
	res.send('page3');
});

app.get('/4/', function(req, res) {
	res.send('page4');
});

app.get('/5/', function(req, res) {
	res.send('page5');
});