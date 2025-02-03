import express, { query } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';

let app = express();
let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({ extended: true }));

const handlebars = expressHandlebars.create({
	defaultLayout: 'main',
	extname: 'hbs'
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

// №1⊗jsPmSMMA
// Сделайте три маршрута. По заходу на первый маршрут запишите данные в куку. По заходу на второй - выведите их. А по заходу на третий - удалите данные.
app.get('/1-1', (req, res) => {
	console.log('1-1');
	res.cookie('data', '1-1');
	res.send('Main 1-1');
});

app.get('/1-2', (req, res) => {
	console.log('1-2');
	let cookie = req.cookies;
	console.log(cookie);
	res.send(JSON.stringify(cookie));
});

app.get('/1-3', (req, res) => {
	console.log('1-3');
	res.clearCookie('data');
	res.send('cleared');
});

// №2⊗jsPmSMMA
// Сделайте один маршрут. По первому заходу на этот маршрут установите куку, а по второму заходу - выведите эту куку на экран.
let counter = 0;
app.get('/2', (req, res) => {
	counter++;
	if (counter % 2 !== 0) {
		res.cookie('data', '2');
		res.send('Main 2');
	} else {
		let cookie = req.cookies;
		console.log(cookie);
		res.send(JSON.stringify(cookie));
	}
});

// №1⊗jsPmSMMA
// Установите куку для определенной папки сайта. Проверьте, что на других адресах сайта эта кука читаться не будет.
app.get('/test/', (req, res) => {
	res.cookie('test', 'true', {
		path: '/test/'
	});
	console.log(req.cookies);
	res.send('Установите куку для определенной папки сайта');
});

// №2⊗jsPmSMMA
// Установите какую-нибудь куку на месяц.
app.get('/test1/', (req, res) => {
	res.cookie('test1', 'true', {
		maxAge: 1000 * 60 * 60 * 24 * 30
	});
	console.log(req.cookies);
	res.send('Установите какую-нибудь куку на месяц.');
});
// №3⊗jsPmSMMA
// Установите какую-нибудь куку на год.
app.get('/test2/', (req, res) => {
	res.cookie('test2', 'true', {
		maxAge: 1000 * 60 * 60 * 24 * 30 * 12
	});
	console.log(req.cookies);
	res.send('Установите какую-нибудь куку на год.');
});

// №4⊗jsPmSMMA
// Установите какую-нибудь куку на 10 лет.
app.get('/test3/', (req, res) => {
	res.cookie('test3', 'true', {
		maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10
	});
	console.log(req.cookies);
	res.send('Установите какую-нибудь куку на 10 лет.');
});

// №1⊗jsPmSMMA
// С помощью формы спросите имя пользователя. Запишите это имя в куку. При следующем заходе на сайт поприветствуйте пользователя.
app.get('/task1/', (req, res) => {
	res.render('index');
});

app.post('/task1/', (req, res) => {
	if (req.body) {
		res.render('index', {
			userName: req.body.userName
		});
	} else {
		res.render('index');
	}
});

// №2⊗jsPmSMMA
// Запишите в куку момент времени захода пользователя на страницу. При обновлении страницы выведите на экран, сколько времени прошло с момента первого захода на страницу.
// Функция возвращает текущее время в миллисекундах
const getCurrentTime = () => {
	return Date.now();
};

app.get('/task2/', (req, res) => {
	if (!req.cookies.time) {
		res.cookie('time', getCurrentTime().toString(), { maxAge: 1000 * 60 * 60 * 24 * 365 });
		res.render('index', {
			time: 'Это ваш первый заход на страницу.'
		});
	} else {
		const firstTime = parseInt(req.cookies.time, 10);
		const now = getCurrentTime();
		const diff = now - firstTime;

		const diffInSeconds = Math.floor(diff / 1000);

		res.render('index', {
			time: `С момента первого захода прошло ${diffInSeconds} секунд.`
		});
	}
});

// №3⊗jsPmSMMA
// Сделайте счетчик захода пользователя на сайт. Пусть при каждом обновлении страницы этот счетчик увеличивается на единицу.
let counter2 = 0;
app.get('/task3/', (req, res) => {
	counter2++;
	res.render('index', {
		counter: counter2.toString()
	});
});
app.listen(3000, () => console.log('Server started: http://localhost:3000'));
