import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
import express from 'express';
import expressHandlebars from 'express-handlebars';

const app = express();

let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
	// useUnifiedTopology: true
});
// mongoClient.connect(async function (error, mongo) {
// 	console.log(error);
// 	if (!error) {
// 		console.log('connection is successful');
// 		let db = mongo.db('test');
// 		let coll = db.collection('users');

// 		let res = await coll.find().toArray();
// 		console.log(res);
// 	} else {
// 		console.error(error);
// 	}
// });

async function run() {
	try {
		await mongoClient.connect();
		console.log('Connection is successful');

		const db = mongoClient.db('test');
		const coll = db.collection('users');

		const res = await coll.find().toArray();
		console.log('Fetched Data:', res);

		let res2 = await coll.find({ salary: 500 }).toArray();
		console.log(res2);

		let res3 = await coll.find({ age: 26 }).toArray();
		console.log('age property');
		console.log(res3);

		let res4 = await coll.find({ salary: 500, age: 26 }).toArray();
		console.log('salary: 500, age: 26 ');
		console.log(res4);

		//№1⊗ndMgBsDF Из тестовой таблицы с продуктами получите все продукты, у которых цена равна 300.
		let coll2 = await db.collection('prods');
		let res5 = await coll2.find({ cost: 300 }).toArray();
		console.log('prods 1');
		console.log(res5);

		//№2⊗ndMgBsDF Из тестовой таблицы с продуктами получите все продукты, у которых остаток равен 10.
		let res6 = await coll2.find({ rest: 10 }).toArray();
		console.log('prods 2');
		console.log(res6);

		// 		№3⊗ndMgBsDF
		// Из тестовой таблицы с продуктами получите все продукты, у которых цена равна 100, а остаток равен 10.
		let res7 = await coll2.find({ cost: 100, rest: 10 }).toArray();
		console.log('prods 3');
		console.log(res7);

		// 		№1⊗ndMgBsDG
		// Из тестовой таблицы с продуктами получите первый продукт.
		console.log('первый продукт');
		let res8 = await coll2.findOne();
		console.log(res8);

		// 		№2⊗ndMgBsDG
		// Из тестовой таблицы с продуктами получите первый продукт с ценой 300.
		console.log('первый продукт с ценой 300.');
		let res9 = await coll2.findOne({ cost: 300 });
		console.log(res9);

		// №3⊗ndMgBsDG
		// Из тестовой таблицы с продуктами получите первый продукт с ценой 300 и остатком 30.
		console.log('первый продукт с ценой 300 и остатком 30');
		let res10 = await coll2.findOne({ cost: 300, rest: 30 });
		console.log(res10);

		// 		№1⊗ndMgBsDC
		// Узнайте, сколько документов в коллекции с продуктами.
		console.log('сколько документов в коллекции с продуктами.');
		console.log(await coll2.countDocuments());

		// 		№2⊗ndMgBsDC
		// Узнайте, сколько продуктов имеет цену 500.
		console.log('сколько продуктов имеет цену 500');
		console.log(await coll2.countDocuments({ cost: 500 }));

		// 		№1⊗ndMgBsDP
		// Получите все продукты так, чтобы в выборке были только поля name и cost.
		console.log('чтобы в выборке были только поля name и cost');
		let proj = { name: 1, cost: 1, _id: 0 };
		console.log(await coll2.find().project(proj).toArray());

		// 		№2⊗ndMgBsDP
		// Получите все продукты так, чтобы в выборке были все поля, кроме _id.
		console.log('все поля, кроме _id');
		proj = { _id: 0 };
		console.log(await coll2.find().project(proj).toArray());

		// 		№1⊗ndMgBsUV
		// Получите массив всех цен из коллекции с продуктами.
		console.log('массив всех цен из коллекции с продуктами');
		console.log(await coll2.distinct('cost'));

		// 		№1⊗ndMgBsDA
		// Дан объект с продуктом:
		// let prod = {name: 'test', cost: 300, rest: 30};
		// Добавьте этот продукт в коллекцию prods.
		console.log('Добавьте этот продукт в коллекцию prods');
		let prod = { name: 'test', cost: 300, rest: 30 };
		console.log(await coll2.insertOne(prod));

		// Добавьте эти продукты в коллекцию prods.
		console.log('Добавьте эти продукты  в коллекцию prods');
		let prods = [
			{
				name: 'prod1',
				cost: 1000,
				rest: 100
			},
			{
				name: 'prod2',
				cost: 2000,
				rest: 200
			},
			{
				name: 'prod3',
				cost: 3000,
				rest: 300
			}
		];
		console.log(await coll2.insertMany(prods));

		//№1⊗ndMgBsDD Удалите первый продукт с ценой 400.
		console.log('Удалите первый продукт с ценой 400');
		console.log(await coll2.deleteOne({ cost: 400 }));

		//№2⊗ndMgBsDD Удалите первый продукт в коллекции.
		console.log('Удалите первый продукт в коллекции');
		console.log(await coll2.deleteOne());

		// 		№3⊗ndMgBsDD
		// Удалите все продукты с ценой 500.
		console.log('Удалите первый продукт в коллекции');
		console.log(await coll2.deleteMany({ rest: 10 }));

		//
		console.log('Поиск продукта с ценой 400:');
		console.log(await coll2.find({ cost: 400 }).toArray());

		console.log('Поиск всех продуктов с rest: 10:');
		console.log(await coll2.find({ rest: 10 }).toArray());

		// 		№4⊗ndMgBsDD
		// Выведите в консоль первый продукт. Одновременно удалите его из базы.
		console.log('Одновременно удалите его из базы.');
		let var1 = await coll2.findOneAndDelete({ cost: 300 });
		console.log(var1);
		console.log(await coll2.findOneAndDelete({ cost: 100 }));

		// 		№5⊗ndMgBsDD
		// Удалите какую-нибудь коллекцию из вашей базы данных.
		coll2 = await db.collection('categories');
		await coll2.drop();

		// Найдите первый продукт с ценой 300 и установите ему цену 900.
		coll2 = await db.collection('prods');
		console.log('Найдите первый продукт с ценой 300 и установите ему цену 900');
		console.log(await coll2.updateOne({ cost: 300 }, { $set: { cost: 900 } }));

		//Установите всем продуктам цену в 1000.
		console.log('Установите всем продуктам цену в 1000');
		// console.log(await coll2.updateMany({}, { $set: { cost: 1000 } }));

		//Установите всем продуктам цену в 300 и остаток в 10.
		console.log('Установите всем продуктам цену в 300 и остаток в 10.');
		// console.log(await coll2.updateMany({}, { $set: { cost: 300, rest: 10 } }));

		//Получите первый продукт. При получении добавьте ему поле touch, в которое запишется момент времени получения продукта.
		console.log(
			'Получите первый продукт. При получении добавьте ему поле touch, в которое запишется момент времени получения продукта.'
		);
		// console.log(await coll2.findOneAndUpdate({}, { $set: { touch: new Date() } }));

		// Получите продукты, у которых цена меньше 500.
		console.log('Получите продукты, у которых цена меньше 500');
		console.log(await coll2.find({ cost: { $lt: 500 } }).toArray());

		//Получите продукты, у которых цена больше 500.
		console.log('Получите продукты, у которых цена больше 500.');
		console.log(await coll2.find({ cost: { $gt: 500 } }).toArray());

		//Получите пользователей, чей возраст меньше либо равен 44.
		coll2 = await db.collection('users');
		console.log(await coll2.find({ age: { $lte: 44 } }).toArray());

		//Получите продукты, у которых цена меньше или равна 500.
		coll2 = await db.collection('prods');
		console.log(await coll2.find({ cost: { $lte: 500 } }).toArray());

		//Получите продукты, у которых цена больше или равна 500.
		console.log(await coll2.find({ cost: { $gte: 500 } }).toArray());

		//Получите продукты, у которых цена равна 500.
		console.log(await coll2.find({ cost: { $eq: 500 } }).toArray());

		//Получите продукты, у которых цена не равна 500.
		console.log(await coll2.find({ cost: { $ne: 500 } }).toArray());

		//Получите продукты, у которых цена равна 500, 600 или 700.
		console.log(await coll2.find({ cost: { $in: [500, 600, 700] } }).toArray());

		//Получите продукты, у которых цена не равна 100 или 200.
		console.log(await coll2.find({ cost: { $nin: [100, 200] } }).toArray());

		//Удалите все продукты, у которых цена больше 300.
		// console.log(await coll2.deleteMany({ cost: { $gt: 300 } }));

		//Удалите все продукты, у которых цена равна 100 или 200.
		// console.log(await coll2.deleteMany({ cost: [100, 200] }));

		console.log('в порядке возрастания');
		// Отсортируйте продукты в порядке возрастания их цены.
		console.log(await coll2.find().sort({ cost: 1 }).toArray());

		console.log('в порядке убывания ');
		//Отсортируйте продукты в порядке убывания их цены.
		console.log(await coll2.find().sort({ cost: -1 }).toArray());

		//Получите первые три продукта.
		console.log('Получите первые три продукта.');
		console.log(await coll2.find().limit(3).toArray());

		//Получите вторые три продукта.
		console.log('Получите вторые три продукта.');
		console.log(await coll2.find().skip(3).limit(3).toArray());

		//Отсортируйте продукты по цене. Из результата сортировки получите первых 5 продуктов.
		console.log(
			'Отсортируйте продукты по цене. Из результата сортировки получите первых 5 продуктов.'
		);
		console.log(await coll2.find().sort({ cost: 1 }).limit(5).toArray());

		[
			{
				name: 'john',
				addr: {
					country: 'Britain',
					city: 'London'
				}
			},
			{
				name: 'luis',
				addr: {
					country: 'Britain',
					city: 'London'
				}
			},
			{
				name: 'eric',
				addr: {
					country: 'Britain',
					city: 'Manchester'
				}
			},
			{
				name: 'kyle',
				addr: {
					country: 'France',
					city: 'Paris'
				}
			}
		];
		//Из приведенной коллекции получите всех юзеров из Лондона.
		console.log('из Лондона');
		coll2 = await db.collection('users');
		console.log(await coll2.find({ 'addr.city': 'London' }).toArray());

		//Из приведенной коллекции получите всех работников с зарплатой 2000.
		[
			{
				employee: {
					name: 'john',
					addr: {
						country: 'Britain',
						city: 'London'
					},
					position: {
						name: 'programmer',
						salary: 1000
					}
				}
			},
			{
				employee: {
					name: 'luis',
					addr: {
						country: 'Britain',
						city: 'London'
					},
					position: {
						name: 'programmer',
						salary: 1000
					}
				}
			},
			{
				employee: {
					name: 'eric',
					addr: {
						country: 'Britain',
						city: 'Manchester'
					},
					position: {
						name: 'programmer',
						salary: 2000
					}
				}
			},
			{
				employee: {
					name: 'kyle',
					addr: {
						country: 'France',
						city: 'Paris'
					},
					position: {
						name: 'programmer',
						salary: 2000
					}
				}
			}
		];
		console.log('Из приведенной коллекции получите всех работников с зарплатой 2000');
		console.log(await coll2.find({ 'employee.position.salary': 2000 }).toArray());

		//Из приведенной коллекции получите всех юзеров, которые знают испанский.
		console.log('Из приведенной коллекции получите всех юзеров, которые знают испанский.');
		console.log(await coll2.find({ langs: 'spanish' }).toArray());

		//Из приведенной коллекции получите всех юзеров, которые знают немецкий и испанский.
		console.log('знают немецкий и испанский');
		console.log(await coll2.find({ langs: { $all: ['spanish', 'german'] } }).toArray());

		//Из приведенной коллекции получите всех юзеров, у которых испанский является вторым элементом в массиве.
		console.log('испанский является вторым элементом в массиве');
		console.log(await coll2.find({ 'langs.1': 'spanish' }).toArray());

		//Получите продукты, у которых три цвета.
		console.log('три цвета');
		coll2 = await db.collection('clothes');
		console.log(await coll2.find({ colors: { $size: 3 } }).toArray());

		//Получите продукты, размер которых содержит значение из диапазона от 3 до 5.
		console.log('размер которых содержит значение из диапазона от 3 до 5.');
		console.log(await coll2.find({ sizes: { $in: [3, 4, 5] } }).toArray());

		let collection = await mongoClient.db('test').collection('prods');

		app.get('/prods', async (req, res) => {
			let rez = await collection.find({}).toArray();
			console.log('/prods');
			console.log(rez);
			res.json(rez);
		});

		app.get('/prods/prod/:name', async (req, res) => {
			let request = req.params.name;
			let rez = await collection.find({ name: request }).toArray();
			console.log('/prods');
			console.log(rez);
			res.json(rez);
		});

		//Модифицируйте предыдущую задачу так, чтобы продукт показывался по его id.
		//67c21edf4d7161ccc1b5cf46
		app.get('/prods/pr/:id', async (req, res) => {
			let id = req.params.id;
			let objectId = new ObjectId(id);
			let rez = await collection.find({ _id: objectId.toString() }).toArray();
			console.log('/prods');
			console.log(rez);
			res.json(rez);
		});
	} catch (error) {
		console.error('Error:', error);
	}

	//Сделайте маршрут, который будет показывать в браузере определенный продукт по его имени.
	app.get('/prods/show/:name', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let name = req.params.name;
		let rez = await coll3.findOne({ name: name });
		console.log(rez);
		res.json(rez);
	});

	//Выведите данные продукта, оформив их в какую-нибудь верстку.
	const handlebars = expressHandlebars.create({
		defaultLayout: 'layout',
		extname: 'hbs'
	});
	app.engine('hbs', handlebars.engine);
	app.set('view engine', 'hbs');
	app.set('views', './views');

	app.get('/prods/show-info/:name', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let name = req.params.name;
		let rez = await coll3.findOne({ name: name });
		console.log(rez);
		//Сделайте так, чтобы, если запрошенный продукт не найден, то рендерился файл с 404 ошибкой.
		if (rez) {
			res.render('prod', { prod: rez });
		} else {
			res.status(404).send('error 404');
		}
	});
	//Выведите записи из коллекции с продуктами, оформив их в приведенную верстку.
	app.get('/prods/all', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let rez = await coll3.find({}).toArray();
		if (rez) {
			res.render('task1', { rez: rez });
		} else {
			res.status(404).send('error 404');
		}
	});

	//Добавьте такую же ссылку в таблицу с вашими продуктами.
	app.get('/prods/all2', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let rez = await coll3.find({}).toArray();
		if (rez) {
			res.render('task2', { rez: rez });
		} else {
			res.status(404).send('error 404');
		}
	});

	//Добавьте ссылку на удаление для каждого продукта из вашей таблицы с продуктами.
	app.get('/prods/show-info/delete/:name', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let name = req.params.name;
		let rez = await coll3.deleteOne({ name: name });

		let updatedRez = await coll3.find({}).toArray();
		res.render('task4', { rez: updatedRez, message: `deleted successfully ${name}` });
	});

	app.get('/prods/all3', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		let rez = await coll3.find({}).toArray();
		if (rez) {
			res.render('task3', { rez: rez });
		} else {
			res.status(404).send('error 404');
		}
	});

	//Сделайте форму для добавления нового продукта
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.get('/prods/add', async (req, res) => {
		res.render('task5');
	});

	app.post('/prods/add', async (req, res) => {
		const db2 = mongoClient.db('test');
		let coll3 = await db2.collection('prods');
		console.log(req.body);
		await coll3.insertOne(req.body);
		let newRez = coll3.find({}).toArray();
		res.render('task5', { rez: newRez, message: 'Added product: ' + req.body.name });
	});
}
run().then(() => app.listen(3001, () => console.log(`http://localhost:${3001}/prods`)));
