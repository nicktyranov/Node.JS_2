// Handlebars в Express
//19.Передача параметров в хелперы в Handlebars
import express from 'express';
import expressHandlebars from 'express-handlebars';

// №1⊗ndExHpPr
// Сделайте хелпер, который параметрами будет принимать число и возвращать квадратный корень из этого числа.

// №2⊗ndExHpPr
// Сделайте хелпер, который параметрами будет принимать дробь и округлять ее до одного знака в дробной части.

// №3⊗ndExHpPr
// Сделайте хелпер, который параметрами будет принимать три числа и возвращать сумму этих чисел.

// №4⊗ndExHpPr
// Сделайте хелпер, который параметром будет принимать строку и возвращать эту строку с заглавной первой буквой.

// №5⊗ndExHpPr
// Сделайте хелпер, который параметром будет принимать дату в формате год - месяц - день и возвращать эту дату в формате день - месяц - год.

// №6⊗ndExHpPr
// Сделайте хелпер, который параметром будет принимать дату в формате год-месяц-день и возвращать день недели, на которую приходится эта дата.

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
			// rest.pop();
			[...rest].forEach(item => sum += isNaN(item) ? 0 : item);
			return sum;
		},
		firstUppercase: function (str) {
			if (!str) {
				return; 
			}
			return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
		},
		dateReverse: function (date) {
			if (!date) return 'Invalid date';
			return date.split('-').reverse().join('-');
		},
		getWeekNumber: function (date) { //не работает
			return new Date(date).toLocaleDateString('en-US', { week: 'numeric' });
		},

		// purchase: {
		// 	name: 'food',
		// 	cost: 1000,
		// 	amount: 5
		// }
		shoppingTask: function (obj) {
			if (!obj || !obj.name || !obj.cost || !obj.amount) {
				return 'Invalid purchase';
			}
			return `${obj.name} – $${(obj.cost * obj.amount)}`;
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


app.get('/19', (req, res) => {
	let layout = 'main';

	if (req.query.a !== undefined) {
		layout = 'admin';
	} else if (req.query.u !== undefined) {
		layout = 'user';
	}

	res.render('index', {
		text: 'loremloremloremloremloremlorem',
		layout: layout
	});
});

// №1⊗jsPmSMMA
// Передайте в представление три переменных с датами. Примените к каждой из этих переменных созданный вами ранее хелпер, меняющий формат вывода даты.
app.get('/19-1', (req, res) => {
	res.render('index', {
		date1: '10-12-2024',
		date2: '11-12-2024',
		date3: '15-12-2024'
		
	});
});

// №1⊗jsPmSMMA
// Передайте в представление три переменных с датами. Примените к каждой из этих переменных созданный вами ранее хелпер, меняющий формат вывода даты.
app.get('/19-2', (req, res) => {
	res.render('index', {
		dates: ['10-12-2024', '11-12-2024', '15-12-2024']
	});
});

// №1⊗jsPmSMMA
// Пусть в представление передаются данные покупки:

// app.get('/', function(req, res) {
// 	res.render('test', {
// 		purchase: {
// 			name: 'food',
// 			cost: 1000,
// 			amount: 5
// 		}
// 	});
// });
// Сделайте хелпер, который параметром будет принимать объект с покупкой и вводить ее стоимость - сумму, умноженную на количество.
app.get('/19-3', (req, res) => {
	res.render('index', {
		purchase: {
			name: 'food',
			cost: 1000,
			amount: 5
		}
	});
});

/*
№1⊗jsPmSMMA
Пусть в представление передаются данные покупки:

res.render('test', {
	purchases: [
		{
			name: 'purch1',
			cost: 1000,
			amount: 5
		},
		{
			name: 'purch2',
			cost: 2000,
			amount: 6
		},
		{
			name: 'purch3',
			cost: 3000,
			amount: 7
		},
	],
});
Переберите покупки циклом и для каждой покупки выведите ее цену, количество единиц и полную стоимость покупки (цена умножить на количество).
*/
app.get('/19-4', (req, res) => {
	res.render('index', {
		purchases: [
			{
				name: 'purch1',
				cost: 1000,
				amount: 5
			},
			{
				name: 'purch2',
				cost: 2000,
				amount: 6
			},
			{
				name: 'purch3',
				cost: 3000,
				amount: 7
			}
		]
	});
});

//Генерация HTML кода в Handlebars
// №1⊗jsPmSMMA
// Сделайте хелпер, который будет создавать тег img. С помощью этого хелпера выведите на экран несколько картинок.

//Локальные хелперы в Handlebars
// №1⊗jsPmSMMA
// Создайте какой-нибудь локальный хелпер.

// №2⊗jsPmSMMA
// Пусть у вас есть глобальный хелпер. Переопределите его поведение для какого-нибудь урла.
app.get('/19-6', function(req, res) {
	res.render('index', {
		data1: 1,
		data2: 2,
		
		helpers: {
			sum: (a, b) => {
				return a + b;
			},
			makeImgTag: (src, alt) => {
				return `<img src="${src}" alt="${alt}"> from link ${src}`;
			}
		}
	});
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));

