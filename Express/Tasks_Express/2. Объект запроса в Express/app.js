import express from 'express';

// №1⊗ndExBsRq
// Самостоятельно опробуйте работу описанный свойств.
// http://localhost:3000/dir/page.html?get1=1&get2=2

let app = express();
app.get('/', function(req, res) {
	res.send('hello world');
}).listen(3000, function() {
	console.log('running');
});

// Путь
// С помощью свойства path мы можем получить запрошенный адрес без протокола, хоста, порта и строки запроса:
app.get('/dir/page.html', function(req, res) {
	console.log(req.path); // выведет '/dir/page.html'
	console.log(req.url); // выведет '/dir/page.html?get1=1&get2=2'
	console.log(req.originalUrl); // выведет '/dir/page.html?get1=1&get2=2'
	console.log(req.query); // содержит объект {get1: '1', get2: '2'}
	console.log(req.query.get1); // выведет '1'
	console.log(req.protocol); // выведет 'http'
	console.log(req.secure); // выведет false
	console.log(req.headers);
	console.log(req.acceptsLanguages());
	console.log(req.ip);
	res.send('/dir/page.html');
});

// Урл
// С помощью свойства url мы можем получить запрошенный адрес с путем и строкой запроса:
app.get('/dir/page.html', function(req, res) {
	console.log(req.url); // выведет '/dir/page.html?get1=1&get2=2'
});

// свойство originalUrl, которое гарантированно будет содержать оригинальный урл:
app.get('/dir/page.html', function(req, res) {
	console.log(req.originalUrl); // выведет '/dir/page.html?get1=1&get2=2'
});

// Строка запроса
// С помощью свойства query мы можем получить строку запроса в виде объекта с ключами и значениями:
app.get('/dir/page.html', function(req, res) {
	console.log(req.query); // содержит объект {get1: '1', get2: '2'}
});

// Давайте для примера получим значение GET параметра с именем get1:
app.get('/dir/page.html', function(req, res) {
	console.log(req.query.get1); // выведет '1'
});

// Протокол
// С помощью свойства protocol мы можем получить протокол:
app.get('/dir/page.html', function(req, res) {
	console.log(req.protocol); // выведет 'http'
});
// Есть также свойство secure, которое содержит true для HTTPS протокола, и false - для обычного HTTP:
app.get('/dir/page.html', function(req, res) {
	console.log(req.secure); // выведет false
});

// Заголовки
// С помощью свойства headers мы можем получить заголовки запроса:
app.get('/dir/page.html', function(req, res) {
	console.log(req.headers);
});

// Языки
// С помощью метода acceptsLanguages мы можем получить предпочитаемые пользователем языки:
app.get('/dir/page.html', function(req, res) {
	console.log(req.acceptsLanguages());
});
// IP адрес
// С помощью свойства ip мы можем получить IP адрес пользователя:
app.get('/dir/page.html', function(req, res) {
	console.log(req.ip);
});