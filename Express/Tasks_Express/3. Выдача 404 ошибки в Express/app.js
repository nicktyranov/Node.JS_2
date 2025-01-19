import express from 'express';

// №1⊗ndExBsRq
// Самостоятельно опробуйте работу описанный свойств.
// http://localhost:3000/dir/page.html?get1=1&get2=2

let app = express();
app.get('/', function(req, res) {
	res.send('hello world');
}).listen(3000, function() {
	console.log('running');
});

app.get('/1/', function(req, res) {
	res.send('page1');
});

app.get('/2/', function(req, res) {
	res.send('page2');
});

app.use(function(req, res) {
	res.status(404).send('404 error - not found');
});