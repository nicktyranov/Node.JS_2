import express from 'express';
import { engine } from 'express-handlebars';
import handlebars from 'handlebars';
import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { title } from 'process';

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
app.use((req, res, next) => {
	res.locals.user = req.session.user || null;
	next();
});

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
/*
DATA STRUCTURE

{
  _id: ObjectId,                  // уникальный ID опроса
  title: String,                  // название опроса
  description: String,            // описание
  createdAt: Date,                // дата создания
  questions: [                    // массив вопросов
    {
      _id: ObjectId,              // уникальный ID вопроса
      text: String,               // текст вопроса
      answers: [                  // массив вариантов ответов
        {
          text: String,           // текст варианта ответа
          votes: Number           // счётчик голосов (изначально 0)
        }
      ]
    }
  ]
}


{
  "_id": "66174d5a2e8f4e2d7e19c123",
  "title": "Любимый язык программирования",
  "description": "Опрос среди разработчиков",
  "createdAt": "2024-04-10T00:00:00Z",
  "questions": [
    {
      "_id": "66174d5a2e8f4e2d7e19c124",
      "text": "Какой язык вы используете чаще всего?",
      "answers": [
        { "text": "JavaScript", "votes": 10 },
        { "text": "Python", "votes": 7 },
        { "text": "C++", "votes": 4 }
      ]
    }
  ]
}
*/

app.get('/', (req, res) => {
	res.render('index', { title: 'Main Page' });
});

app.get('/login', (req, res) => {
	if (req.query.notification) {
		let notification = req.query.notification;
		return res.render('login', { title: 'Login Page', notification });
	}

	res.render('login', { title: 'Login Page' });
});

app.post('/login', async (req, res) => {
	await mongoClient.connect();
	await db
		.collection('users')
		.findOne({ username: req.body.username })
		.then((user) => {
			bcrypt.compare(req.body.password, user.password).then((result) => {
				if (result) {
					req.session.user = user;
					console.log('pass matched');
					res.redirect('/');
				} else {
					console.log('wrong pass');
					res.redirect('/login?notification=Username/password incorrect');
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

app.get('/create', (req, res) => {
	if (!req.session.user) {
		return res.redirect('/login?notification=must be authorized');
	}
	res.render('create', { title: 'Creave a survey' });
});

app.post('/create', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/login?notification=must be authorized');
	}
	await mongoClient.connect();
	console.log(req.body);
	const questions = req.body.questions.map((q) => ({
		_id: new ObjectId(),
		text: q.text,
		answers: q.answers.map((ans) => ({
			text: ans.text,
			votes: 0
		}))
	}));

	const result = await db.collection('surveys').insertOne({
		title: req.body.title,
		description: req.body.description,
		createdAt: new Date(),
		questions: questions,
		createdBy: req.session.user._id
	});

	await db
		.collection('users')
		.updateOne({ _id: req.session.user._id }, { $push: { surveys: result.insertedId } });

	res.redirect('/');
});

app.get('/list', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/login?notification=must be authorized');
	}
	await mongoClient.connect();
	const surveys = await db.collection('surveys').find({ createdBy: req.session.user._id }).toArray();
	res.render('list', { title: 'User`s surveys', data: surveys });
});

app.get('/survey/:id', async (req, res) => {
	let id = req.params.id;
	await mongoClient.connect();
	const surveyData = await db.collection('surveys').findOne({ _id: new ObjectId(id) });

	if (!surveyData) {
		return res.status(404).send('Survey not found');
	}
	console.log(surveyData);
	const question = surveyData.questions[0];
	const labels = question.answers.map((a) => a.text);
	const votes = question.answers.map((a) => a.votes);
	res.render('viewSurvey', {
		title: surveyData.title,
		description: surveyData.description,
		questionText: question.text,
		data: [surveyData],
		labels: JSON.stringify(labels),
		votes: JSON.stringify(votes)
	});
});

app.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	});
});

app.listen(3008, () => {
	console.log('Server is running: localhost:3008');
});
