import express from 'express';
import { engine } from 'express-handlebars';
import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { title } from 'process';

const app = express();
const __dirname = path.resolve();

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

app.use(
	session({
		secret: 'secret_key',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	console.log(`Incoming request: ${req.method} ${req.url}`);
	next();
});

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const filename = `${file.fieldname}-${Date.now()}${ext}`;
		cb(null, filename);
	}
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('photoImg');
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');

async function runDb() {
	try {
		await mongoClient.connect();
		console.log('Connection with mongodb is successful');
		// const db = mongoClient.db('reviewsApp');
		// const collection = db.collection('products');
		// const data = await collection.find().toArray();
		// console.log(`Recieved Data: ${JSON.stringify(data)}`);
	} catch (e) {
		console.log(`DB error: ${e.message}`);
	}
}
runDb();

/*
Проект представляет собой сайт, на котором пользователи могут оставлять отзывы на товары и услуги, указывая плюсы и минусы, а также прилагая фото.

Главная страница
На главной странице сайта должен выводиться список из 10 отзывов и пагинация. Для каждого отзыва в тексте должны выводиться название товара, маленькое фото товара, автор отзыва, тип отзыва (негативный, позитивный), первые 50 слов отзыва и ссылка на страницу отзыва.

Страница отзыва
На странице отзыва должны выводиться название товара, фотография, автор отзыва, тип отзыва (негативный, позитивный), полный текст отзыва, список плюсов и список минусов.

Админка
Отзывы должны модерироваться через админку. Админ должен иметь возможность принять, отклонить или отредактировать отзыв.
*/

app.get('/', (req, res) => {
	res.render('index', { title: 'Main Page' });
});

app.get('/leave-a-review/', async (req, res) => {
	await mongoClient.connect();
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('products');
	const data = await collection.find().toArray();
	res.render('create', { title: 'Leave your review', data });
});

app.post('/leave-a-review/', async (req, res) => {
	upload(req, res, async (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).send(`Multer error: ${err.message}`);
		} else if (err) {
			return res.status(400).render('create', { error: err.message });
		}

		if (!req.file) {
			return res.status(400).render('create', { error: 'Only images are allowed!' });
		}

		try {
			await mongoClient.connect();
			const db = mongoClient.db('reviewsApp');
			let collection = db.collection('products');
			let productName = await collection.findOne({ _id: new ObjectId(req.body.select) });

			collection = db.collection('reviews');
			let review = {
				author: req.body.author,
				productId: req.body.select,
				productName: productName.name,
				reviewType: req.body.reviewType,
				advantages: req.body.pros,
				disadvantages: req.body.cons,
				comments: req.body.text,
				photo: req.file.path,
				createdAt: new Date(),
				reviewStatus: 'pending'
			};
			console.log(`review ${JSON.stringify(review)}`);
			await collection.insertOne(review);
			// const data = await collection.find().toArray();
			// res.render('create', { title: 'Leave your review', data });
			res.redirect(302, '/');
		} catch (e) {
			console.log(`DB error: ${e.message}`);
		}
	});
});

app.get('/review/:id', async (req, res) => {
	let id = req.params.id;
	await mongoClient.connect();
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('reviews');
	const data = await collection.find({ _id: new ObjectId(id) }).toArray();
	console.log(`Recieved review data: ${data}`);
	console.log(data);
	// if (!data) {
	// 	return res.send('not found').redirect(302, '/');
	// }
	res.render('review', { title: 'View a review', data });
});

app.get('/login', async (req, res) => {
	res.render('login', { title: 'Login page' });
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	let hashPass = await bcrypt.hash('123', 10);
	console.log(hashPass);
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('users');

	const user = await collection.findOne({ username });

	if (!user) {
		console.log('User not found:', username);
		return res
			.status(401)
			.render('login', { error: 'Invalid credentials', title: 'Login page: error' });
	}

	console.log('Stored hash:', user.password); // 🔍 Отладка: проверяем, какой хэш хранится в БД

	// ✅ Сравниваем введенный пароль с хешем
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		console.log('Password mismatch');
		return res
			.status(401)
			.render('login', { error: 'Invalid credentials', title: 'Login page: error' });
	}

	// ✅ Если все ок – сохраняем пользователя в сессию
	req.session.userId = user._id;
	res.redirect('/admin');
});

function isAuthenticated(req, res, next) {
	if (!req.session.userId) {
		return res.status(401).render('login', {
			error: 'You need to be logged in to view this page',
			title: 'Login page: error'
		});
	}
	next();
}

app.get('/admin', isAuthenticated, async (req, res) => {
	// res.send('authorised user' + req.session.userId);
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('reviews');
	let data = await collection.find({ reviewStatus: 'pending' }).toArray();
	console.log(data);
	res.render('admin', { data, title: 'Admin page' });
});

app.post('/logout', (req, res) => {
	req.session.destroy(() => {
		res.send('Logged out');
	});
});

app.on('error', (e) => {
	console.error(`Error - ${e}`);
});

app.listen(3000, () => {
	console.log('Localhost:3000');
});
