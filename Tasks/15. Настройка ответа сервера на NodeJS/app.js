import http from 'http';

// №1⊗ndPmSvRsp
// Поменяйте код ответа на 404. В качестве текста страницы выведите текст о том, что страница не найдена.
// №2⊗ndPmSvRsp
// Отправьте заголовок Cache-Control со значением 'no-cache'.

http.createServer((req, res) => {
	console.log('server started');
	res.setHeader('Cache-Control', 'no-cache');
	res.statusCode = 404;
	res.write('Page not found');
	res.end();
}).listen(3002);

// №3⊗ndPmSvRsp
// Сделайте так, чтобы ваш сервер при запросе отдавал текущее время, оформленное в каком-нибудь теге.
http.createServer((req, res) => {
	console.log('server started');
	res.setHeader('Content-type', 'text/html');
	res.statusCode = 200;
	res.write(`<b>${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}</b>`);
	res.end();
}).listen(3003);

// №4⊗ndPmSvRsp
// Дан следующий код:

// http.createServer((request, response) => {
// 	response.setHeader('Content-Type', 'text/plain');
// 	response.statusCode = 404;
// 	response.write('page not found');
// 	response.end();
// }).listen(3000);
// Упростите его через метод writeHead.

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.write('page not found');
	response.end();
}).listen(3000);

// №5⊗ndPmSvRsp
// Дан следующий код:

// http.createServer((request, response) => {
// 	response.setHeader('Content-Type', 'text/html');
// 	response.setHeader('Content-Language', 'ru');
// 	response.statusCode = 200;
// 	response.write('{}');
// 	response.end();
// }).listen(3000);
// Упростите его через метод writeHead.


http.createServer((request, response) => {
	response.writeHead(200, {
		'Content-Type': 'text/html',
		'Content-Language': 'ru'
	});
	response.write('{}');
	response.end();
}).listen(3000);
