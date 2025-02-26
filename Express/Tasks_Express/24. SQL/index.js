import express from 'express';
import mysql from 'mysql2/promise';

let connection = await mysql.createConnection({
	host: 'localhost', // имя хоста
	database: 'test', // имя базы данных
	user: 'root', // имя пользователя
	password: 'root', // пароль,
	port: 8889
});

// connection.addListener('error', (err) => {
// 	console.log(err);
// });

console.log(connection);

// let app = express();

// // настройка middleware для обработки запросов:
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.listen(3006, function () {
// 	console.log('Сервер запущен на порту 3006');
// });

let query = 'SELECT * FROM users';

try {
	let [results, fields] = await connection.query(query);

	console.log([results, fields]);
	console.log(results);
	console.log(fields);
} catch (err) {
	console.log(err);
}

let query2 = 'SELECT * FROM users WHERE id = 2';

try {
	let [results, fields] = await connection.query(query2);
	console.log(results);
} catch (err) {
	console.log(err);
}

let query3 = 'SELECT * FROM users WHERE id > 2';

try {
	let [results, fields] = await connection.query(query3);
	console.log(results);
} catch (err) {
	console.log(err);
}

let query4 = 'SELECT * FROM users WHERE name = "user1" ';

try {
	let [results, fields] = await connection.query(query4);
	console.log(results);
} catch (err) {
	console.log(err);
}
console.log('Практические задачи');
// //№1⊗ndSqDBNSl
// Выберите юзера с id, равным 3.

// №2⊗ndSqDBNSl
// Выберите юзеров с зарплатой 900.

// №3⊗ndSqDBNSl
// Выберите юзеров в возрасте 23 года.

// №4⊗ndSqDBNSl
// Выберите юзеров с зарплатой более 400.

// №5⊗ndSqDBNSl
// Выберите юзеров с зарплатой равной или большей 500.

// №6⊗ndSqDBNSl
// Выберите юзеров с зарплатой НЕ равной 500.

// №7⊗ndSqDBNSl
// Выберите юзеров с зарплатой равной или меньшей 500.

let query51 = 'SELECT * FROM users WHERE id = "3" ';
let query52 = 'SELECT * FROM users WHERE salary = "900" ';
// [{ id: 4, name: 'user4', age: 40, salary: 900 }];
let query53 = 'SELECT * FROM users WHERE age = "23" ';
// [{ id: 2, name: 'user2', age: 23, salary: 230 }];
let query54 = 'SELECT * FROM users WHERE salary > "400" ';
// [
// 	{ id: 3, name: 'user3', age: 26, salary: 2600 },
// 	{ id: 4, name: 'user4', age: 40, salary: 900 },
// 	{ id: 5, name: 'user5', age: 45, salary: 9990 },
// 	{ id: 6, name: 'user6', age: 49, salary: 500 }
// ];
let query55 = 'SELECT * FROM users WHERE salary >= "500" ';
// [
// 	{ id: 3, name: 'user3', age: 26, salary: 2600 },
// 	{ id: 4, name: 'user4', age: 40, salary: 900 },
// 	{ id: 5, name: 'user5', age: 45, salary: 9990 },
// 	{ id: 6, name: 'user6', age: 49, salary: 500 }
// ];
let query56 = 'SELECT * FROM users WHERE salary != "500" ';
// [
// 	{ id: 1, name: 'user1', age: 22, salary: 220 },
// 	{ id: 2, name: 'user2', age: 23, salary: 230 },
// 	{ id: 3, name: 'user3', age: 26, salary: 2600 },
// 	{ id: 4, name: 'user4', age: 40, salary: 900 },
// 	{ id: 5, name: 'user5', age: 45, salary: 9990 }
// ];
let query57 = 'SELECT * FROM users WHERE salary <= "500" ';
// [
// 	{ id: 1, name: 'user1', age: 22, salary: 220 },
// 	{ id: 2, name: 'user2', age: 23, salary: 230 },
// 	{ id: 6, name: 'user6', age: 49, salary: 500 }
// ];

let query6 = 'SELECT * FROM users WHERE salary=500 OR age=23';
// [
// 	{ id: 2, name: 'user2', age: 23, salary: 230 },
// 	{ id: 6, name: 'user6', age: 49, salary: 500 }
// ];

let query7 = 'SELECT * FROM users WHERE salary>450 AND salary<900';

console.log('Практические задачи 2');
// №1⊗ndSqDBLO
// Выберите юзеров в возрасте от 25 (не включительно) до 28 лет (включительно).
let query71 = 'SELECT * FROM users WHERE age>25 AND age<=28';
// [{ id: 3, name: 'user3', age: 26, salary: 2600 }];

// №2⊗ndSqDBLO
// Выберите юзера user1.
let query72 = 'SELECT * FROM users WHERE name = "user1"';
// [{ id: 1, name: 'user1', age: 22, salary: 220 }];

// №3⊗ndSqDBLO
// Выберите юзеров user1 и user2.
let query73 = 'SELECT * FROM users WHERE name = "user1" OR name = "user2"';
[
	{ id: 1, name: 'user1', age: 22, salary: 220 },
	{ id: 2, name: 'user2', age: 23, salary: 230 }
];

// №4⊗ndSqDBLO
// Выберите всех, кроме юзера user3.
let query74 = 'SELECT * FROM users WHERE name != "user3"';
[
	{ id: 1, name: 'user1', age: 22, salary: 220 },
	{ id: 2, name: 'user2', age: 23, salary: 230 },
	{ id: 4, name: 'user4', age: 40, salary: 900 },
	{ id: 5, name: 'user5', age: 45, salary: 9990 },
	{ id: 6, name: 'user6', age: 49, salary: 500 }
];
// №5⊗ndSqDBLO
// Выберите всех юзеров в возрасте 27 лет или с зарплатой 1000.
let query75 = 'SELECT * FROM users WHERE age = "27" OR salary = "1000" ';
[]; // нет таких у меня

// №6⊗ndSqDBLO
// Выберите всех юзеров в возрасте 27 лет или с зарплатой не равной 900.
let query76 = 'SELECT * FROM users WHERE age = "27" OR salary != "900" ';
[
	{ id: 1, name: 'user1', age: 22, salary: 220 },
	{ id: 2, name: 'user2', age: 23, salary: 230 },
	{ id: 3, name: 'user3', age: 26, salary: 2600 },
	{ id: 5, name: 'user5', age: 45, salary: 9990 },
	{ id: 6, name: 'user6', age: 49, salary: 500 }
];
// №7⊗ndSqDBLO
// Выберите всех юзеров в возрасте от 23 лет (включительно) до 27 лет (не включительно) или с зарплатой 900.
let query77 = 'SELECT * FROM users WHERE (age >= "23" AND age <27) OR salary = "900" ';
[
	{ id: 2, name: 'user2', age: 23, salary: 230 },
	{ id: 3, name: 'user3', age: 26, salary: 2600 },
	{ id: 4, name: 'user4', age: 40, salary: 900 }
];

// №8⊗ndSqDBLO
// Выберите всех юзеров в возрасте от 23 лет до 27 лет или с зарплатой от 400 до 1000.
let query78 =
	'SELECT * FROM users WHERE (age >= "23" AND age <27) OR (salary > 400 AND salary < 1000)';
[
	{ id: 2, name: 'user2', age: 23, salary: 230 },
	{ id: 3, name: 'user3', age: 26, salary: 2600 },
	{ id: 4, name: 'user4', age: 40, salary: 900 },
	{ id: 6, name: 'user6', age: 49, salary: 500 }
];

try {
	let [results, fields] = await connection.query(query78);
	console.log(results);
} catch (err) {
	console.log(err);
}

//Вывод одной записи в NodeJS OR undefined
console.log('Вывод одной записи в NodeJS');
let query8 = 'SELECT * FROM users';

// №1⊗ndSqDBONO
// Выберите первого юзера, возраст которого более 25 лет.
let query81 = 'SELECT * FROM users WHERE age > 25';

console.log('// Поля выборки при SQL запросе в NodeJS');
// Поля выборки при SQL запросе в NodeJS
let query9 = 'SELECT name, age FROM users WHERE id >= 3';
// { name: 'user3', age: 26 }

// №2⊗ndSqDBSF
// Выберите id, name и age юзеров, зарплата которых больше 400, но меньше 900.
let query91 = 'SELECT id, name, age FROM users WHERE salary > 400 and salary < 900';
// { id: 6, name: 'user6', age: 49 }
try {
	let [results, fields] = await connection.query(query91);
	console.log(results[0]);
} catch (err) {
	console.log(err);
}

//Вставка записей через SQL запрос в NodeJS
console.log('Вставка записей через SQL запрос в NodeJS');
let query10 = 'INSERT INTO users (name, age, salary) VALUES ("user", 30, 1000)';

// №1⊗ndSqDBIMC
// Добавьте нового юзера 'xxxx', не указав ему возраст и зарплату.
let query101 = 'INSERT INTO users (name) VALUES ("xxxx")';

try {
	let connect = await connection.query(query101);
	console.log(connect);
} catch (err) {
	console.log(err);
}

console.log('Обновление записей через SQL запрос в NodeJS');
// Обновление записей через SQL запрос в NodeJS
let query102 = 'UPDATE users SET age=20, salary=800 WHERE id=1';

// №2⊗ndSqDBNU
// Юзеру с id 4 поставьте возраст 35 лет.
let query103 = 'UPDATE users SET age=35 WHERE id=4';

// №3⊗ndSqDBNU
// Всем, у кого зарплата 500, сделайте ее 700.
let query104 = 'UPDATE users SET salary=700 WHERE salary=500';

// №4⊗ndSqDBNU
// Работникам с id больше 2 и меньше 5 включительно поставьте возраст 23.
let query105 = 'UPDATE users SET age=23 WHERE id > 2 AND id < 5';
try {
	let connect = await connection.query(query105);
	console.log(connect);
} catch (err) {
	console.log(err);
}

//Удаление записей через SQL запрос в NodeJS
console.log('Удаление записей через SQL запрос в NodeJS');
// №1⊗ndSqDBNR
// Удалите юзера с id, равным 7.
let query106 = 'DELETE from users WHERE id = 7';
try {
	let connect = await connection.query(query106);
	console.log(connect);
} catch (err) {
	console.log(err);
}

// №2⊗ndSqDBNR
// Удалите всех юзеров, у которых id больше 5 и зарплата больше или равна 900.
let query107 = 'DELETE from users WHERE id > 5 AND salary >=900';

let query108 = 'DELETE from users WHERE salary IS NULL ';

//Переименование поля в NodeJS
let query109 = 'SELECT name as user_name FROM users';

// Переименуйте поле зарплаты юзеров при выводе их в консоль.
let query110 = 'SELECT id, name, salary as user_salary FROM users';

// Выборка записей по конкретным значениям в NodeJS
// №1⊗ndSqDBSVS
// Достаньте юзеров, у которых зарплата имеет значения 400 и 900.
let query111 = 'SELECT id, name, salary FROM users WHERE salary IN (400, 900)';

// №2⊗ndSqDBSVS
// Достаньте юзеров, возраст которых составляет 25, 27 и 28 лет. При этом id более 2.
let query112 = 'SELECT id, name, salary FROM users WHERE age IN (25, 27, 28) AND id > 2';
try {
	let [results, fields] = await connection.query(query108);
	console.log(results);
} catch (err) {
	console.log(err);
}

//Ограничение количества записей в SQL в NodeJS  LIMIT
// №1⊗ndSqDBQL
// Получите первых 4 юзера.
let query113 = 'SELECT * FROM users LIMIT 4';

// №2⊗ndSqDBQL
// Получите юзеров со второго, 3 штуки.
let query114 = 'SELECT * FROM users WHERE id !=1 LIMIT 3';
try {
	let [results, fields] = await connection.query(query114);
	console.log(results);
} catch (err) {
	console.log(err);
}

console.log('Сортировка записей через SQL запрос в NodeJS   ORDER BY');
//Сортировка записей через SQL запрос в NodeJS   ORDER BY
// №1⊗ndSqDBNSr
// Достаньте всех юзеров и отсортируйте их по возрастанию зарплаты.
let query115 = 'SELECT * FROM users ORDER BY salary';

// №2⊗ndSqDBNSr
// Достаньте всех юзеров и отсортируйте их по убыванию зарплаты.
let query116 = 'SELECT * FROM users ORDER BY salary DESC';

// №3⊗ndSqDBNSr
// Достаньте всех юзеров и отсортируйте их по имени.
let query117 = 'SELECT * FROM users ORDER BY name';

// №4⊗ndSqDBNSr
// Достаньте юзеров с зарплатой 500 и отсортируйте их по возрасту.
let query118 = 'SELECT * FROM users WHERE salary=500 ORDER BY age';

// №5⊗ndSqDBNSr
// Достаньте всех юзеров и отсортируйте их по имени и по зарплате.
let query119 = 'SELECT * FROM users ORDER BY name, salary';

// №6⊗ndSqDBNSr
// Отсортируйте юзеров по возрастанию зарплаты и получите первых 3 работника из результата сортировки.
let query120 = 'SELECT * FROM users ORDER BY salary LIMIT 3';

// №7⊗ndSqDBNSr
// Отсортируйте юзеров по убыванию зарплаты и получите первых 3 юзера из результата сортировки.
let query121 = 'SELECT * FROM users ORDER BY salary DESC LIMIT 3';
try {
	let [results, fields] = await connection.query(query121);
	console.log(results);
} catch (err) {
	console.log(err);
}

// Выборка (минимального) значения в SQL в NodeJS MIN / MAX
console.log('Выборка минимального значения в SQL в NodeJS');
// №1⊗ndSqDBMVS
// Выберите самого молодого юзера из таблицы. [ { 'MIN(age)': 20 } ]
let query122 = 'SELECT MIN(age) FROM users';

// №2⊗ndSqDBMVS
// Среди юзеров, возраст которых больше 25 выберите одного с самой маленькой зарплатой.
let query123 = 'SELECT MIN(salary) FROM users WHERE age>25';

// №1⊗ndSqDBMaVS
// Выберите самого старшего юзера из таблицы.
let query124 = 'SELECT MAX(age) FROM users';

// №2⊗ndSqDBMaVS
// Выберите юзера с самой высокой зарплатой.
let query125 = 'SELECT MAX(salary) FROM users';

// №3⊗ndSqDBMaVS
// Выберите юзеров с минимальной и максимальной зарплатой.
let query126 = 'SELECT MIN(salary), MAX(salary) FROM users';
try {
	let [results, fields] = await connection.query(query126);
	console.log(results);
} catch (err) {
	console.log(err);
}

// Сумма значений поля в SQL в NodeJS SUM
console.log('Сумма значений поля в SQL в NodeJS SUM');
// №1⊗ndSqDBSu
// Найдите сумму всех зарплат юзеров.
let query127 = 'SELECT SUM(salary) FROM users';

// №2⊗ndSqDBSu
// Найдите сумму всех возрастов юзеров.
let query128 = 'SELECT SUM(age) FROM users';
// №3⊗ndSqDBSu
// Найдите сумму зарплат юзеров, у которых возраст более или равен 25.
let query129 = 'SELECT SUM(salary) FROM users WHERE age >= 25';
try {
	let [results, fields] = await connection.query(query129);
	console.log(results);
} catch (err) {
	console.log(err);
}

// Подсчет количества через SQL запрос в NodeJS COUNT(*)
console.log('Подсчет количества через SQL запрос в NodeJS COUNT(*)');
// №1⊗ndSqDBQC
// Подсчитайте всех юзеров, чей возраст менее 30.
let query130 = 'SELECT COUNT(*) FROM users WHERE age < 30';
// №2⊗ndSqDBQC
// Подсчитайте всех юзеров с зарплатой, равной 500 и возрастом более 23.
let query131 = 'SELECT COUNT(*) FROM users WHERE salary = 500 AND age > 23';

// №1⊗ndSqDBGr
// Сгруппируйте юзеров по величине зарплаты, при этом выведите их максимальный возраст.
let query132 = 'SELECT salary, MAX(age) as max FROM users GROUP BY salary';

//Сложение строк при выборке в SQL в NodeJS
// №1⊗ndSqDBQC
// Выведите возраст юзеров, добавив к значению слово 'user_age'.
let query133 = 'SELECT age, CONCAT("user_age ", age) AS user_age FROM users';

// №2⊗ndSqDBQC
// Напишите такой запрос к БД, чтобы получить следующий результат:
[
	{ name: 'user1', salary: 'user_salary is 400' },
	{ name: 'user2', salary: 'user_salary is 500' },
	{ name: 'user3', salary: 'user_salary is 500' },
	{ name: 'user4', salary: 'user_salary is 900' },
	{ name: 'user5', salary: 'user_salary is 500' },
	{ name: 'user6', salary: 'user_salary is 900' }
];
let query134 = 'SELECT name, CONCAT("user_salary is ", salary) AS salary FROM users';

/*
Получение данных из связанных таблиц в NodeJS
SELECT поля FROM имя_таблицы
	LEFT JOIN имя_связанной_таблицы ON условие_связи
WHERE условие_выборки

*/
let query135 =
	'SELECT goods.name as product, categories.name as category FROM goods LEFT JOIN categories ON goods.cat_id = categories.id;';
[
	{ product: 'goods n1', category: 'cat1' },
	{ product: 'goods n2', category: 'cat1' },
	{ product: 'goods n3', category: 'cat2' }
];

// №2⊗ndSqDOChLT
// Напишите запрос, который достанет товары, вместе с их подкатегориями и категориями.
let query136 = `SELECT
	goods.name as product,
	categories.name as category,
	main_cat.name as main_category
	FROM goods
	LEFT JOIN categories ON categories.id = goods.cat_id
	LEFT JOIN main_cat ON main_cat.name = categories.parent_category`;

[
	{
		product: 'milk',
		category: 'milk products',
		main_category: 'products'
	},
	{
		product: 'butter',
		category: 'milk products',
		main_category: 'products'
	},
	{
		product: 'bread',
		category: 'bread products',
		main_category: 'products'
	}
];

try {
	let [results, fields] = await connection.query(query136);
	console.log(results);
} catch (err) {
	console.log(err);
}

import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';

const app = express();
const handlebars = expressHandlebars.create({
	defaultLayout: 'main',
	extname: 'hbs'
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', './views'); // Убедитесь, что шаблоны находятся в папке views

app.get('/', async function (req, res) {
	res.send('Server is started');
});

app.get('/1', async function (req, res) {
	let query = 'SELECT * FROM users2';
	let [results, fields] = await connection.query(query);

	res.render('users', { results: results });
});

app.get('/del/', async function (req, res) {
	let message = '';

	try {
		let query = 'Select id, name FROM users2';
		let [results, fields] = await connection.query(query);
		console.log(results);

		message = `${results}`;
		res.render('users', { message: message, results: results });
	} catch (e) {
		console.error(e);
		message = e.message;
		res.render('users', { message: message });
	}
});
app.get('/del1/', async function (req, res) {
	let message = '';

	try {
		let query = 'Select * FROM users2';
		let [results, fields] = await connection.query(query);
		console.log(results);

		message = `${results}`;
		res.render('users', { message: message, results: results });
	} catch (e) {
		console.error(e);
		message = e.message;
		res.render('users', { message: message });
	}
});

app.get('/show/:id', async function (req, res) {
	let id = req.params.id;
	let query = `SELECT * FROM users WHERE id = ${id}`;

	let [results, fields] = await connection.query(query);
	let result = results[0];
	res.render('show', { result: result });
});

app.get('/index', async function (req, res) {
	let query = 'SELECT * FROM users2';

	let [results, fields] = await connection.query(query);
	let result = results;
	res.render('index', { result: result });
});

app.use(express.urlencoded({ extended: true }));
app.get('/add', async function (req, res) {
	res.render('form', { name: '', age: '', salary: '', message: '' });
});

app.post('/add', async function (req, res) {
	let name = req.body.name;
	let age = +req.body.age;
	let salary = +req.body.salary;
	let query = `INSERT INTO users2 
	(name, age, salary) 
	VALUES (?, ?, ?)`;

	let [results, fields] = await connection.query(query, [name, age, salary]);
	res.render('form', { name, age, salary });
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));
