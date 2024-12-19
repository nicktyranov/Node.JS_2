import http from 'http';
import fs from 'fs';
import path from 'path';

// Сделайте сайт о вашем городе. Пусть сайт состоит из 6-ти HTML страниц. К этим страницам должен быть подключен общий CSS файл, общий JavaScript файл, добавлены картинки. На каждой странице должна быть менюшка, с помощью которой можно будет перемещаться по страницам сайта.

// №6⊗ndPmSvSt
// Уберите из ваших адресов расширения HTML файлов.

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd(), 'src'); // Корневая директория для файлов

	let statusCode;
	let data;

	let filePath = path.join(rootDir, request.url);
	console.log('Request path:', filePath);

	try {
		let stats;
		try {
			stats = await fs.promises.stat(filePath);
		} catch {
			filePath += '.html';
			stats = await fs.promises.stat(filePath);
		}

		if (stats.isDirectory()) {
			filePath = path.join(filePath, 'index.html');
		}

		data = await fs.promises.readFile(filePath);
		statusCode = 200;
	} catch (e) {
		console.error('Ошибка при обработке запроса:', e);

		filePath = path.join(rootDir, 'pages', '404.html');
		try {
			data = await fs.promises.readFile(filePath);
			statusCode = 404;
		} catch {
			data = '404 Not Found';
			statusCode = 404;
		}
	}

	const contentType = getMimeType(path.extname(filePath).slice(1));
	response.writeHead(statusCode, { 'Content-Type': contentType });
	response.end(data);
}).listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});

function getMimeType(ext) {
	const mimes = {
		html: 'text/html',
		css: 'text/css',
		js: 'application/javascript',
		png: 'image/png',
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		ico: 'image/x-icon',
		avif: 'image/avif',
		webp: 'image/webp',
		svg: 'image/svg+xml',
		json: 'application/json'
	};
	return mimes[ext] || 'text/plain';
}