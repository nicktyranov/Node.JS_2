// Роутинг и массивы в Express
import express from 'express';
let app = express();
app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
// №1⊗ndExRtAr
// Дан следующий массив:

// let users = ['user1', 'user2', 'user3', 'user4', 'user5'];
// Создайте маршрут, который будет отправлять в браузер запрошенный элемент этого массива.

// №2⊗ndExRtAr
// Модифицируйте предыдущую задачу так, чтобы при запросе несуществующего элемента массива отдавалась 404 страница.
let users = ['user1', 'user2', 'user3', 'user4', 'user5'];
//arr[0] - arr[4]
app.get('/:num', (req, res) => {
	let num = Number(req.params.num);
	console.log(num);
	if (num >= 0 && num < users.length) {
		res.send(users[num]);
	} else {
		res.status(404).send('Not found');
	}
});

// №3⊗ndExRtAr
// Дан следующий массив объектов:

// let users = [
// 	{
// 		name: 'user1',
// 		age:  31,
// 	},
// 	{
// 		name: 'user2',
// 		age:  32,
// 	},
// 	{
// 		name: 'user3',
// 		age:  33,
// 	},
// ];
// Сделайте маршрут, возвращающий одного юзера, и маршрут, возвращающий заданную характеристику юзера.
let users3 = [
	{
		name: 'user1',
		age:  31
	},
	{
		name: 'user2',
		age:  32
	},
	{
		name: 'user3',
		age:  33
	}
];

//маршрут, возвращающий одного юзера
app.get('/user/:id', (req, res) => {
	let id = Number(req.params.id);
	if (id >= 0 && id < users3.length) {
		res.send(users3[id]);
	} else {
		res.status(404).send('Not found');
	}
});

//маршрут, возвращающий заданную характеристику юзера.
app.get('/user/:id/:field', (req, res) => {
	let id = Number(req.params.id);
	let field = req.params.field;
	if (id >= 0 && id < users3.length && field in users3[id]) {
		res.send(users3[id][field].toString());
	} else {
		res.status(404).send('Not found');
	}
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));
