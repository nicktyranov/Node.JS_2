import express from 'express';
let app = express();

//Регулярные выражения в маршрутах Express
// №1⊗ndExRtPR
// Попробуйте описанный функционал.

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/user(name)?', (req, res) => {
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