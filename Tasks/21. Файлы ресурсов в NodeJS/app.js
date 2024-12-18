import http from 'http';
import fs from 'fs';

// №1⊗ndPmSvRsr
// Создайте файл styles.css. Отдайте его по соответствующему запросу. Не забудьте правильно указать тип данных.
// №2⊗ndPmSvRsr
// Создайте файл script.js. Отдайте его по соответствующему запросу. Не забудьте правильно указать тип данных.
// №3⊗ndPmSvRsr
// Разместите у себя файл с фавиконкой, назвав его favicon.ico. Уберите в вашем коде условие для блокировки двойного запроса, а вместо этого отдавайте корректную фавиконку.

http.createServer(async (request, response) => {
	let type;
	let data;
	
	if (request.url == '/styles.css') {
		type = 'text/css';
		data = await fs.readFileSync('styles.css');
	} else if (request.url == '/script.js') {
		type = 'text/javascript';
		data = await fs.readFileSync('script.js');

	} else if (request.url == '/favicon.ico'){
		type = 'text/icon';
		data = await fs.readFileSync('favicon.ico');
	} else {
		type = 'text/plain';
		data = '404 Not Found';
		response.writeHead(404, { 'Content-Type': type });
		response.end(data);
		return;
	}
	response.writeHead(200, { 'Content-Type': type });
	response.write(data);
	response.end();
	
}).listen(3000);

// №4⊗ndPmSvRsr
// Скопируйте приведенный код HTML страницы и разместите его в файле. Отдайте этот файл браузеру по соответствующему запросу. Сделайте так, чтобы браузер получил запрошенные им файлы ресурсов, на которые ссылается наша HTML страница.
http.createServer(async (request, response) => {
	console.log('Server is running');
	let type;
	let data;

	try {
		if (request.url === '/index.html') {
			type = 'text/html';
			data = await fs.promises.readFile('index.html');
		} else if (request.url === '/styles.css') {
			type = 'text/css';
			data = await fs.promises.readFile('styles.css');
		} else if (request.url === '/script.js') {
			type = 'text/javascript';
			data = await fs.promises.readFile('script.js');
		} else if (request.url === '/favicon.ico') {
			type = 'image/x-icon';
			data = await fs.promises.readFile('favicon.ico');
		} else if (request.url === '/img.png') {
			type = 'image';
			data = await fs.promises.readFile('img.png');
		} else {
			type = 'text/plain';
			data = '404 Not Found';
			response.writeHead(404, { 'Content-Type': type });
			response.end(data);
			return;
		}

		response.writeHead(200, { 'Content-Type': type });
		response.end(data);

	} catch (error) {
		console.error(error);
		response.writeHead(500, { 'Content-Type': 'text/plain' });
		response.end('500 Internal Server Error');
	}

	
	
}).listen(3001);