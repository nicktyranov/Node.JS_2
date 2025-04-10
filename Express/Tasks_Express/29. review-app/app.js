import express from 'express';
import { engine } from 'express-handlebars';
import handlebars from 'handlebars';
import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';

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
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: 'lax',
			secure: false
		}
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
	console.log(`Incoming request: ${req.method} ${req.url}`);
	next();
});

handlebars.registerHelper('eq', function (a, b) {
	return a?.toString() === b?.toString();
});

handlebars.registerHelper('or', function (a, b) {
	return a || b;
});

handlebars.registerHelper('cutWords', function (text, count) {
	if (!text) return '';
	const words = text.split(' ');
	return words.slice(0, count).join(' ') + (words.length > count ? '...' : '');
});

handlebars.registerHelper('dateConverter', function (dateObj) {
	if (!dateObj) return '';
	let date = new Date(dateObj);
	let convertedDate = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(date);
	return convertedDate;
});

handlebars.registerHelper('increment', (value) => parseInt(value) + 1);
handlebars.registerHelper('decrement', (value) => parseInt(value) - 1);
handlebars.registerHelper('gt', (a, b) => a > b);
handlebars.registerHelper('lt', (a, b) => a < b);

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
	} catch (e) {
		console.log(`DB error: ${e.message}`);
	}
}
runDb();

app.get('/', async (req, res) => {
	let message = req.query.message;
	const page = parseInt(req.query.page) || 1;
	const limit = 8;
	const skip = (page - 1) * limit;

	await mongoClient.connect();
	const db = mongoClient.db('reviewsApp');
	const products = await db.collection('products').find().toArray();
	const reviews = await db
		.collection('reviews')
		.find({ reviewStatus: 'approved' })
		.skip(skip)
		.limit(limit)
		.toArray();

	// { productId: { name, photo } }
	const productMap = {};
	(await products).forEach((product) => {
		productMap[product._id] = product;
	});
	const dataWithImg = reviews.map((review) => {
		const product = productMap[review.productId.toString()];
		return {
			...review,
			productPhoto: product?.image || null
		};
	});

	const totalCount = await db.collection('reviews').countDocuments({ reviewStatus: 'approved' });
	const totalPages = Math.ceil(totalCount / limit);

	res.render('index', {
		title: 'Main Page',
		data: dataWithImg,
		message,
		page,
		totalPages
	});
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
				productPhoto: productName.image,
				reviewType: req.body.reviewType,
				advantages: req.body.pros,
				disadvantages: req.body.cons,
				comments: req.body.text,
				photo: req.file?.path || null,
				createdAt: new Date(),
				reviewStatus: 'pending'
			};
			await collection.insertOne(review);
			res.redirect(302, '/?message=Your review was send for moderation');
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
	res.render('review', { title: 'View a review', data });
});

app.get('/login', async (req, res) => {
	if (req.session.userId) {
		return res.redirect('/admin');
	}
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
	console.log('Пароль из формы:', req.body.password);
	console.log('Хеш из базы:', user.password);
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		console.log('Password mismatch');
		return res
			.status(401)
			.render('login', { error: 'Invalid credentials', title: 'Login page: error' });
	}
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
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('reviews');
	let data = await collection.find({ reviewStatus: 'pending' }).toArray();
	res.render('admin', { data, title: 'Admin page' });
});

app.get('/admin/review/:id', async (req, res) => {
	const id = req.params.id;
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('reviews');
	let data = await collection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { reviewStatus: 'approved' } }
	);
	res.redirect('/admin');
});

app.delete('/admin/review/:id', async (req, res) => {
	const id = req.params.id;
	const db = mongoClient.db('reviewsApp');
	const collection = db.collection('reviews');
	await collection.deleteOne({ _id: new ObjectId(id) });
	res.redirect('/admin');
});

app.get('/admin/review/edit/:id', async (req, res) => {
	const id = req.params.id;
	const db = mongoClient.db('reviewsApp');

	const reviewsCollection = db.collection('reviews');
	let loginData = await reviewsCollection.findOne({ _id: new ObjectId(id) });

	const productsCollection = db.collection('products');
	let data = await productsCollection.find().toArray();

	res.render('edit', { loginData: [loginData], data: data });
});

app.post('/admin/review/edit/:id', async (req, res) => {
	const id = req.params.id;
	const db = mongoClient.db('reviewsApp');

	const reviewsCollection = db.collection('reviews');
	await reviewsCollection.updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: {
				author: req.body.author,
				reviewType: req.body.reviewType,
				advantages: req.body.pros,
				disadvantages: req.body.cons,
				comments: req.body.text
			}
		}
	);
	res.redirect(302, '/admin');
});

app.post('/admin/review/delete/:id', async (req, res) => {
	const id = req.params.id;
	const db = mongoClient.db('reviewsApp');

	const reviewsCollection = db.collection('reviews');
	await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
	res.redirect(302, '/admin');
});

app.post('/logout', (req, res) => {
	req.session.destroy(() => {
		res.send('Logged out');
	});
});

app.on('error', (e) => {
	console.error(`Error - ${e}`);
});

app.listen(3005, () => {
	console.log('Localhost:3005');
});
