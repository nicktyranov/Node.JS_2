import express from 'express';
let app = express();
app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
// Необязательные параметры в маршрутах Express
// №1⊗ndExRtOP
// Дан маршрут:

// app.get('/test/:num1/:num2/', function(req, res) {
	
// });
// Сделайте так, чтобы второй параметр этого маршрута был не обязательным.

app.get('/test/:num1?/:num2/', (req, res) => {
	console.log(req.path);
	const text = 'Общий текст';
	res.send(`${text} + path: ${req.path} `);
});

// №2⊗ndExRtPR
// Попробуйте описанный функционал.
app.get('/1|2(name)?|user(name)?', (req, res) => {
	console.log(req.path);
	const text = 'Общий текст';
	res.send(`${text} + path: ${req.path} `);
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));