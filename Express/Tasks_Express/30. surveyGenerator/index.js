import express from 'express';
import { engine } from 'express-handlebars';
import handlebars from 'handlebars';
import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.engine(
	'hbs',
	engine({
		defaultLayout: 'main',
		extname: 'hbs',
		layoutsDir: './views/layouts'
	})
);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(
	session({
		secret: 'secret_key',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: 'lax',
			secure: false
		}
	})
);

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');
let db = mongoClient.db('surveyApp');
async function runDb() {
	try {
		await mongoClient.connect();
		console.log('Connection with mongodb is successful');
	} catch (e) {
		console.log(`DB error: ${e.message}`);
	}
}
runDb();

/*
Проект "Конструктор опросов"
Проект представляет собой сайт, с помощью которого пользователи смогут создавать свои опросы.

Главная страница
На главной странице должен располагаться список из 20 опросов и пагинация. Каждый пункт списка должен состоять из названия опроса и его описания.
Страница создания опроса
На данной странице должен быть инпут для названия опроса, текстареа для описания опроса, и форма для добавления пунктов опроса. Добавленные пункты можно удалять и редактировать.
Список опросов
На данной странице пользователь видит список созданных им опросов. Он может перейти на опрос, перейти на страницу его редактирования, либо удалить опрос.
Страница опроса
На данной странице располагается название, описание, и сам созданный опрос, в котором пользователи сайта могут принимать участие, выбирая один из вариантов ответа. После этого сайт должен показать, сколько процентов опрошенных ответили на каждый из вариантов ответов.
Регистрация
Опросы могут создавать только зарегистрированные пользователи.

*/

app.get('/', (req, res) => {
	res.render('index', { title: 'Main Page' });
});

app.get('/login', (req, res) => {
	res.render('login', { title: 'Login Page' });
});

app.post('/login', async (req, res) => {
	await mongoClient.connect();
	db
		.collection('users')
		.findOne({ username: req.body.username })
		.then((user) => {
			bcrypt.compare(req.body.password, user.password).then((result) => {
				if (result) {
					req.session.user = user;
					console.log('pass matched');
					res.redirect('/');
				} else {
					res.redirect('/login');
				}
			});
		});
});

app.get('/login/registration', (req, res) => {
	res.render('registration', { title: 'Create an account' });
});

app.post('/login/registration', async (req, res) => {
	await mongoClient.connect();
	db.collection('users').insertOne({
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, 10)
	});
	res.redirect('/login');
});

app.listen(3008, () => {
	console.log('Server is running: localhost:3008');
});
