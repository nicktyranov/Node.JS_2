import http from 'http';

// №1⊗ndPmSvRq
// Пообращайтесь к серверу с различными URL. Посмотрите, что будет выводится в консоль в этом случае.

http.createServer((req, res) => {
	console.log(req.url); // '/'
	console.log(req.method);
	console.log(req.headers);
	res.writeHead(200, {
		'content-type': 'text/html'
	});
	res.write('Hello World!');
	res.end();
}).listen(3000);

// №2⊗ndPmSvRq
// Выведите в консоль содержимое заголовка host.
http.createServer((req, res) => {
	console.log(req.url); 
	console.log(req.method);
	console.log(req.headers);
	console.log(req.headers.host); //localhost:3001
	res.writeHead(200, {
		'content-type': 'text/html'
	});
	res.write('Hello World!');
	res.end();
}).listen(3001);