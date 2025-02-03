import express, { query } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';
import expressSession from 'express-session';

let app = express();
let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(expressSession({ secret: secret }));
app.use(bodyParser.urlencoded({ extended: true }));

const handlebars = expressHandlebars.create({
	defaultLayout: 'main',
	extname: 'hbs'
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.get('/23', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

// №1⊗jsPmSMMA
// Сделайте три маршрута. По заходу на первый маршрут запишите данные в сессию. По заходу на второй - выведите их. А по заходу на третий - удалите данные.
app.get('/231', (req, res) => {
	console.log('маршрут 1');
	let session = (req.session.path1 = '231');
	console.log(session);
	res.send('маршрут 1');
});

app.get('/232', (req, res) => {
	console.log('маршрут 2');
	res.send(JSON.stringify(req.session.path1));
});

app.get('/233', (req, res) => {
	console.log('маршрут 3');
	delete req.session.path1;
	console.log(req.session);
	res.send('deleted');
});

// №2⊗jsPmSMMA
// Сделайте один маршрут. По первому заходу на этот маршрут установите запишите данные в сессию, а по второму заходу - выведите эти данные на экран.
let visit = 1;
let counter2 = 0;
app.get('/234', (req, res) => {
	if (visit % 2 !== 0) {
		let session = (req.session.task2 = `task2 data ${counter2.toString()}`);
		counter2++;
		console.log(session);
		res.send('data was recorded to TASK2 – ' + counter2.toString());
	} else {
		res.send(JSON.stringify(req.session.task2));
	}
});

// №1⊗jsPmSMMA
// Сделайте счетчик обновления страницы на сессиях.
app.get('/235', (req, res) => {
	if (!req.session.counter) {
		req.session.counter = 1;
		res.send('counter was created. ' + 'Current value: ' + JSON.stringify(req.session.counter));
	} else {
		req.session.counter++;
		res.send('counter was updated. ' + 'Current value: ' + JSON.stringify(req.session.counter));
	}
});

// №2⊗jsPmSMMA
// Запишите в сессию время захода пользователя на сайт. При обновлении страницы выводите сколько секунд назад пользователь зашел на сайт.
app.get('/236', (req, res) => {
	if (!req.session.time) {
		req.session.time = JSON.stringify(new Date());
		res.send('first visit');
	} else {
		let time = new Date(JSON.parse(req.session.time)); // иначе будет строчка, а не объект Дата "2025-02-03T05:50:39.778Z"
		let now = new Date();
		let diff = now - time;
		req.session.time = JSON.stringify(new Date());
		res.send(`Your last visit was ${(diff / 1000).toFixed(1)} seconds ago`);
	}
});
app.listen(3000, () => console.log('Server started: http://localhost:3000'));
