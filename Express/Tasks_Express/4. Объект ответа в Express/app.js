import express from 'express';

// №1⊗ndExBsRq
// Самостоятельно опробуйте работу описанный свойств.
// http://localhost:3000/dir/page.html?get1=1&get2=2

// №2⊗ndExBsRs
// Напишите код, который для какого-нибудь адреса выполнит 303 редирект.

let app = express();
app.get('/', function(req, res) {
	res.status(403).send('hello world');
}).listen(3000, function() {
	console.log('running');
});

app.get('/1/', function(req, res) {
	res.send('page1');
});

app.get('/2/', function(req, res) {
	res.send('page2');
});

app.get('/admin', (req, res) => {
	res.redirect(303, '/');
});


// №3⊗ndExBsRs
// Сделайте маршрут, который будет отдавать какой-нибудь JSON. Корректно установите тип содержимого.
app.get('/example.json', (req, res) => {
	res.type('application/json');
	res.json({ message: 'file will be downloaded soon' });
});

app.use(function(req, res) {
	res.status(404).send('404 error - not found');
});