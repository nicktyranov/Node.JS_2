//forms
//Практика на формы в Express
import express, { query } from 'express';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

const handlebars = expressHandlebars.create({
	defaultLayout: 'main',
	extname: 'hbs',
	helpers: {
		timeRN: function () {
			return new Intl.DateTimeFormat('US-us', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date());
		},
		sqrt: function (value) {
			return Math.sqrt(value);
		},
		round1: function (value) {
			return value.toFixed(1);
		},
		sum: function (...rest) {
			let sum = 0;
			[...rest].forEach((item) => (sum += isNaN(item) ? 0 : item));
			return sum;
		},

		makeImgTag: function (src, alt) {
			return `<img src="${src}" alt="${alt}">`;
		}
	}
});

let app = express();
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

// №1⊗jsPmSMMA
// Напишите скрипт, который будет преобразовывать температуру из градусов Цельсия в градусы Фаренгейта. Для этого сделайте инпут и кнопку
app.get('/211', (req, res) => {
	if (req.query) {
		res.render('task1', {
			result: (req.query.temp * 9) / 5 + 32
		});
	} else {
		res.render('task1');
	}
});

// №2⊗jsPmSMMA
// Напишите скрипт, который будет считать факториал числа. Само число вводится в инпут и после нажатия на кнопку пользователь должен увидеть результат.
function calc(num) {
	let result = 1;
	for (let i = 1; i <= num; i++) {
		result *= i;
	}
	return result;
}

app.get('/212', (req, res) => {
	if (req.query) {
		res.render('task2', {
			result: calc(Number(req.query.num))
		});
	} else {
		res.render('task2');
	}
});

// №3⊗jsPmSMMA
// Дан инпут и кнопка. В инпут вводится число. По нажатию на кнопку выведите список делителей этого числа.
const listDividers = (num) => {
	let result = [];
	for (let i = 1; i <= num; i++) {
		if (num % i === 0) {
			result.push(i);
		}
	}
	return result.join(', ');
};

app.get('/213', (req, res) => {
	if (req.query) {
		res.render('task3', {
			result: listDividers(Number(req.query.num))
		});
	} else {
		res.render('task3');
	}
});

// №4⊗jsPmSMMA
// Даны 2 инпута и кнопка. В инпуты вводятся числа. По нажатию на кнопку выведите список общих делителей этих двух чисел.
const findSimilarDividers = (...nums) => {
	let rez = [];
	for (let i = 1; i <= Math.min(...nums); i++) {
		if (nums.every((el) => el % i === 0)) {
			rez.push(i);
		}
	}
	return rez.join(', ');
};

app.get('/214', (req, res) => {
	let rez = findSimilarDividers(...Object.values(req.query).map((el) => Number(el)));

	if (req.query) {
		res.render('task4', {
			result: rez
		});
	} else {
		res.render('task4');
	}
});

// №5⊗jsPmSMMA
// Напишите скрипт, который будет находить корни квадратного уравнения. Для этого сделайте 3 инпута, в которые будут вводиться коэффициенты уравнения.
const findRoots = (a, b, c) => {
	let d = b * b - 4 * a * c;
	if (d < 0) {
		return 'Нет корней';
	} else if (d === 0) {
		return `x = ${-b / (2 * a)}`;
	} else {
		return `x1 = ${(-b + Math.sqrt(d)) / (2 * a)}, x2 = ${(-b - Math.sqrt(d)) / (2 * a)}`;
	}
};

app.get('/215', (req, res) => {
	if (req.query.a) {
		res.render('task5', {
			result: findRoots(Number(req.query.a), Number(req.query.b), Number(req.query.c))
		});
	} else {
		res.render('task5');
	}
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));
