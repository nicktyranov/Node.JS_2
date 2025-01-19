import express from 'express';
import __dirname from './dirname.js';

// №1⊗ndExBsHF
// Дан следующий массив:

// let users = ['user1', 'user2', 'user3', 'user4', 'user5'];
// Создайте маршрут, который будет отправлять в браузер запрошенный элемент этого массива.
let users = ['user1', 'user2', 'user3', 'user4', 'user5'];

let app = express();
app.get('/', function(req, res) {
	res.status(403).send('hello world');
}).listen(3000, function() {
	console.log('running');
});

app.get('/user/:id', (req, res) => {
	const id = parseInt(req.params.id, 10); 
	if (id >= 0 && id < users.length) {
		res.send(users[id]); 
	} else {
		res.status(404).send('User not found'); 
	}
});

// app.use(express.static(__dirname + '/public/'));

// app.use(function(req, res) {
// 	res.status(404).send('404 error - not found');
// });

// №2⊗ndExBsHF
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
// Сделайте маршрут, возвращающий всех юзеров в виде списка ul.
let users2 = [
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

app.get('/task2', (req, res) => {
	try {
		console.log('Маршрут /task2 вызван');
		let rez = '<ul>';
		for (let el of users2) {
			rez += `<li>${el.name} - ${el.age}</li>`;
		}
		rez += '</ul>';
		res.send(rez);
	} catch (err) {
		res.status(500).send('Internal Server Error');
	}
});


// №3⊗ndExBsHF
// Дан следующий массив объектов:

// let employees = [
// 	{
// 		surname: 'surname1',
// 		name:    'user1',
// 		salary:  1000,
// 	},
// 	{
// 		surname: 'surname2',
// 		name:    'user2',
// 		salary:  2000,
// 	},
// 	{
// 		surname: 'surname3',
// 		name:    'user3',
// 		salary:  3000,
// 	},
// ];
// Сделайте маршрут, возвращающий всех работников в виде HTML таблицы.
let employees = [
	{
		surname: 'surname1',
		name:    'user1',
		salary:  1000
	},
	{
		surname: 'surname2',
		name:    'user2',
		salary:  2000
	},
	{
		surname: 'surname3',
		name:    'user3',
		salary:  3000
	}
];

app.get('/task3', (req, res) => {
	try {
		console.log('Маршрут /task3 вызван');
		let rez = '<table>';
		for (let el of employees) {
			rez += `<tr><td><b>${el.surname}</b></td><td>${el.name}</td><td>${el.salary}</td></tr>`;
		}
		rez += '</table>';
		res.send(rez);
	} catch (err) {
		res.status(500).send('Internal Server Error');
	}

});


app.use(express.static(__dirname + '/public/'));

app.use(function(req, res) {
	res.status(404).send('404 error - not found');
});