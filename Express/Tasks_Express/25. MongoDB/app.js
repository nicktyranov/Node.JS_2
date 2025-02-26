import mongodb from 'mongodb';

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
		console.log(await coll2.updateMany({}, { $set: { cost: 1000 } }));

		//Установите всем продуктам цену в 300 и остаток в 10.
		console.log('Установите всем продуктам цену в 300 и остаток в 10.');
		console.log(await coll2.updateMany({}, { $set: { cost: 300, rest: 10 } }));

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
		console.log(await coll2.deleteMany({ cost: { $gt: 300 } }));

		//Удалите все продукты, у которых цена равна 100 или 200.
		console.log(await coll2.deleteMany({ cost: [100, 200] }));
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await mongoClient.close();
	}
}

run();
