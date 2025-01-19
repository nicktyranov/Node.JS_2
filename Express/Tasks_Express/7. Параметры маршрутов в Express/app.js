import express from 'express';
let app = express();

// №1⊗ndExRtPr
// Передайте в маршруте какое-нибудь число. В качестве ответа верните в браузер квадрат этого числа.

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/:num', (req, res) => {
	console.log(req.params.num);
	let rez = Math.pow(Number(req.params.num), 2).toString();
	console.log(rez);
	res.send(rez);
});

// №2⊗ndExRtPr
// Передайте в маршруте два числа. В качестве ответа верните в браузер сумму этих чисел.
app.get('/task2/:num1/:num2', (req, res) => {
	console.log(req.params.num1);
	console.log(req.params.num2);
	let rez = Number(req.params.num1) + Number(req.params.num2);
	console.log(rez);
	res.send(rez.toString());
});

// №3⊗ndExRtPr
// Передайте в маршруте три числа. В качестве ответа верните в браузер сумму этих чисел.
app.get('/task3/:num1/:num2/:num3', (req, res) => {
	console.log(req.params); //{ num1: '1', num2: '4', num3: '5' }
	let rez = 0;
	for (let el in req.params) {
		console.log(el);
		console.log(req.params[el]);
		rez += Number(req.params[el]);
	}
	res.send(rez.toString());
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));