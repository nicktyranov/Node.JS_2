import express from 'express';
import { engine } from 'express-handlebars';
import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import moment from 'moment';

const app = express();

app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: './views/layouts',
		helpers: {
			formatDate: (date) => {
				if (!date) return 'No date';
				return moment.utc(date).format('MMM D, YYYY'); // Принудительно UTC
			}
		}
	})
);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use((req, res, next) => {
	console.log(`Incoming request: ${req.method} ${req.url}`);
	next();
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');
async function runDb() {
	try {
		await mongoClient.connect();
		console.log('Connection with mongodb is successful');
		const db = mongoClient.db('reminderApp');
		const collection = db.collection('reminders');
		const data = await collection.find().toArray();
		console.log(`Recieved Data: ${JSON.stringify(data)}`);
	} catch (e) {
		console.log(`DB error: ${e.message}`);
	}
}
runDb();
/*
Проект "Напоминалка"
Проект представляет собой напоминалку о делах.

{{
"id": 1,
"name": "Сходить в магазин",
"date": "01/12/2025",
"done": false
}}

Список дел
Напоминалка должна представлять собой список дел. Каждое дело должно иметь название и дату.
Пользователь может совершать с делами следующие операции: создавать, редактировать, удалять.

Главная страница
На главной странице должны появляться напоминания о делах, дата которых 3 и менее дней. Стиль напоминания должен изменяться в зависимости от количества дней, которые остались до даты.
Каждое напоминание должно иметь кнопки "отложить" и "сделано". При нажатии на кнопку "отложить" напоминание пропадает на текущий день. При нажатии на кнопку "сделано" напоминание исчезает и в таблице дел дело отмечается как сделанное.
*/

app.get('/', async (req, res) => {
	let message = null;
	let threeDaysAhead = new Date();
	threeDaysAhead.setDate(threeDaysAhead.getDate() + 3);

	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');
	let data = await collection
		.find({ done: false, date: { $lte: threeDaysAhead } })
		.sort({ date: 1 })
		.toArray();

	const today = moment().startOf('day');
	data.forEach((el) => {
		const diffDays = moment(el.date).startOf('day').diff(today, 'days');
		if (diffDays === 1 || diffDays === 0) {
			el.cssClass = 'less1day';
		} else if (diffDays === 2) {
			el.cssClass = 'less2days';
		} else if (diffDays === 3) {
			el.cssClass = 'less3days';
		} else {
			el.cssClass = ''; //more than 3 days
		}
	});

	if (req.query.message || req.body.message) {
		if (req.query.message) {
			message = req.query.message;
		} else {
			message = req.body.message;
		}
		console.log(message);
		res.render('index', { title: 'Main Page', data, message: message });
	} else {
		res.render('index', { title: 'Main Page', data });
	}
});

app.get('/all', async (req, res) => {
	let message = null;

	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');
	let data = await collection.find({ done: false }).sort({ date: 1 }).toArray();

	const today = moment().startOf('day');
	data.forEach((el) => {
		const diffDays = moment(el.date).startOf('day').diff(today, 'days');
		if (diffDays === 1 || diffDays === 0) {
			el.cssClass = 'less1day';
		} else if (diffDays === 2) {
			el.cssClass = 'less2days';
		} else if (diffDays === 3) {
			el.cssClass = 'less3days';
		} else {
			el.cssClass = ''; //more than 3 days
		}
	});

	if (req.query.message || req.body.message) {
		if (req.query.message) {
			message = req.query.message;
		} else {
			message = req.body.message;
		}
		console.log(message);
		res.render('index', { title: 'All Reminders', data, message: message });
	} else {
		res.render('index', { title: 'All Reminders', data });
	}
});

app.get('/delete/:id', async (req, res) => {
	let id = req.params.id;
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	const result = await collection.deleteOne({ _id: new ObjectId(id) });

	if (result.deletedCount === 1) {
		res.redirect(302, `/?message=Record with the id ${id} was deleted`);
	} else {
		res.redirect(302, `/?message=Failed to delete record with id ${id}`);
	}
});

app.get('/edit/:id', async (req, res) => {
	let id = req.params.id;
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	if (!ObjectId.isValid(id)) {
		return res.redirect('/?message=' + encodeURIComponent(`Invalid ID format: ${id}`));
	}

	try {
		let result = await collection.findOne({ _id: new ObjectId(id) });

		if (!result) {
			return res.redirect('/?message=' + encodeURIComponent(`Record with ID ${id} not found`));
		}
		result.date = moment.utc(result.date).format('YYYY-MM-DD');
		console.log(result);
		res.render('edit', { title: 'Edit a reminder', data: result });
	} catch (error) {
		console.error('Error fetching record:', error);
		res.redirect('/?message=' + encodeURIComponent(`Error retrieving record: ${error.message}`));
	}
});

app.post('/edit/:id', async (req, res) => {
	let id = req.params.id;
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	if (!ObjectId.isValid(id)) {
		return res.redirect('/?message=' + encodeURIComponent(`Invalid ID format: ${id}`));
	}

	try {
		let result = await collection.findOne({ _id: new ObjectId(id) });

		if (!result) {
			return res.redirect('/?message=' + encodeURIComponent(`Record with ID ${id} not found`));
		}
		result = {
			...result,
			name: req.body.name,
			date: req.body.date.length > 0 ? new Date(req.body.date) : result.date
		};
		await collection.updateOne({ _id: new ObjectId(id) }, { $set: result });
		res.redirect(302, '/?message=Updated succcesfully');
	} catch (error) {
		console.error('Error fetching record:', error);
		res.redirect('/?message=' + encodeURIComponent(`Error retrieving record: ${error.message}`));
	}
});

app.get('/create/', async (req, res) => {
	res.render('create', { title: 'Create a reminder' });
});

app.post('/create/', async (req, res) => {
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	let newData = {
		name: req.body.name,
		date: new Date(req.body.date),
		done: false
	};
	await collection.insertOne(newData);
	res.redirect(302, '/?message=The new record was added');
});

app.get('/done/:id', async (req, res) => {
	let id = req.params.id;
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	await collection.updateOne({ _id: new ObjectId(id) }, { $set: { done: true } });
	res.redirect(302, '/?message=Status of reminder was succcesfully updated');
});

app.get('/delay/:id', async (req, res) => {
	let id = req.params.id;
	const db = mongoClient.db('reminderApp');
	const collection = db.collection('reminders');

	try {
		let reminder = await collection.findOne({ _id: new ObjectId(id) });
		if (!reminder) {
			return res.redirect(302, '/?message=Reminder not found');
		}

		let newDate = new Date(reminder.date);
		newDate.setDate(newDate.getDate() + 1);

		await collection.updateOne({ _id: new ObjectId(id) }, { $set: { date: newDate } });

		res.redirect(302, '/?message=Reminder delayed by one day');
	} catch (error) {
		console.error('Error delaying reminder:', error);
		res.redirect(302, '/?message=Error updating reminder');
	}
});

app.use('*', (req, res, next) => {
	console.log(`404 Not Found: ${req.originalUrl}`);
	res.status(404).send('Page not found');
});

app.use((req, res) => {
	res.status(404).send('Page not found');
});

app.listen(3000, () => {
	console.log('localhost:3000/');
});
