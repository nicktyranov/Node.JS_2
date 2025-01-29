//forms
//20-1 Отправка формы методом GET в Express
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
			[...rest].forEach(item => sum += isNaN(item) ? 0 : item);
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
// Сделайте форму с тремя инпутами. После отправки формы отправьте в браузер сумму введенных в инпуты чисел.
app.get('/20-1-form', (req, res) => {
	res.render('form');

});

app.get('/20-1', (req, res) => {
	console.log('20-1');
	console.log(req.query);
	let sum = 0;
	for (let num of Object.values(req.query)) {
		console.log(req.query);
		if (!isNaN(num)) {
			sum += Number(num);
		} else {
			console.log('Некорректное значение', num);
		}
	}
	console.log('Calculated sum:', sum);
	res.render('index', {
		sum: sum
	});

});

// №1⊗jsPmSMMA
// Дана форма, спрашивающая у пользователя его имя, возраст и зарплату. Сделайте так, чтобы после отправки формы в ней остались введенные данные.
app.get('/20-2', (req, res) => {
	console.log('20-2');
	res.render('form1', {
		query: req.query
	});

});

// №1⊗jsPmSMMA
// С помощью формы спросите у пользователя пять чисел. После отправки формы выведите на экран сумму этих чисел.
app.get('/20-3', (req, res) => {
	console.log('20-3');
	if (req.query.submit) {
		let sum = 0;
		for (let num of Object.values(req.query)) {
			console.log(req.query);
			if (!isNaN(num)) {
				sum += Number(num);
			} else {
				console.log('Некорректное значение', num);
			}
		}
		console.log(sum);
		res.render('index', {
			sum1: sum
		});
	} else {
		res.render('form2');
	}
});

// №1⊗jsPmSMMA
// С помощью формы спросите имя пользователя. После отправки формы поприветствуйте пользователя по имени, а форму уберите.
app.get('/20-4', (req, res) => {
	console.log('20-4');
	res.render('form3', {
		query: req.query
	});
});

// №1⊗jsPmSMMA
// Спросите у пользователя его имя, город и страну. Выведите полученные данные на странице.
app.use(bodyParser.urlencoded({extended: true}));
app.get('/20-5', (req, res) => {
	console.log('20-5');
	res.render('form4');
});

app.post('/rez-1', (req, res) => {
	console.log('20-5');
	console.log(req.body);
	res.send('result');
});

// №1⊗jsPmSMMA
// Дана форма, отправляемая методом POST. Сделайте так, чтобы форма и ее результат были на одном URL.
app.get('/20-6', (req, res) => {
	console.log('20-6');
	res.render('form5');
});
app.post('/20-6', (req, res) => {
	res.send('result');
});

// №1⊗jsPmSMMA
// Спросите у пользователя его логин, пароль и email. Сделайте так, чтобы после отправки формы в ней остались введенные данные.
app.get('/20-7', (req, res) => {
	console.log('/20-7');
	res.render('form6');
});
app.post('/20-7', (req, res) => {
	res.render('form6', {
		body: req.body
	});
});

// №1⊗jsPmSMMA
// Попросите пользователя оставить отзыв на сайт. После отправки формы выведите этот отзыв на экран.
app.get('/20-8', (req, res) => {
	console.log('/20-8');
	res.render('form7');
});
app.post('/20-8', (req, res) => {
	console.log(req.body);
	console.log(req.body.review);
	res.render('form7', {
		review: req.body.review,
		body: req.body
	});
});

//Чекбокс в Express
// №1⊗jsPmSMMA
// Сделайте форму с инпутом и флажком. С помощью инпута спросите у пользователя имя. После отправки формы, если флажок был отмечен, поприветствуйте пользователя, а если не был отмечен - попрощайтесь.
app.get('/20-9', (req, res) => {
	console.log('/20-9');
	res.render('form8');
});
app.post('/20-9', (req, res) => {
	console.log(req.body);
	res.render('form8', {
		body: req.body
	});
});

// №2⊗jsPmSMMA
// С помощью флажка спросите у пользователя, есть ему уже 18 лет или нет. Если есть, разрешите ему доступ на сайт, а если нет - не разрешите.
app.get('/20-10', (req, res) => {
	res.render('form9');
});
app.post('/20-10', (req, res) => {
	console.log(req.body);
	if (req.body.is18Age !== undefined) {
		res.render('form9', {
			body: req.body,
			message: 'Access approved'
		});
	} else {
		res.redirect('/');
	}
});

//Элемент radio в Express
// №1⊗jsPmSMMA
// С помощью двух переключателей спросите у пользователя его пол. Выведите результат на экран.
app.get('/20-11', (req, res) => {
	res.render('form10');
});
app.post('/20-11', (req, res) => {
	console.log(req.body);
	if (req.body.gender !== undefined) {
		res.render('form10', {
			body: req.body,
			gender: req.body.gender
		});
	}
});

//Элемент select в Express
// №1⊗jsPmSMMA
// С помощью выпадающего списка предложите пользователю выбрать страну, в которой он живет.
// С помощью выпадающего списка попросите пользователя выбрать его язык.
app.get('/20-12', (req, res) => {
	res.render('form11');
});
app.post('/20-12', (req, res) => {
	console.log(req.body);
	if (req.body.country || req.body.lang) {
		res.render('form11', {
			body: req.body
		});
	} else {
		res.render('form11');
	}
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));

