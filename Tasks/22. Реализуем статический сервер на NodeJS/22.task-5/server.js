import http from 'http';
import fs from 'fs';
import path from 'path';

// Сделайте сайт о вашем городе. Пусть сайт состоит из 6-ти HTML страниц. К этим страницам должен быть подключен общий CSS файл, общий JavaScript файл, добавлены картинки. На каждой странице должна быть менюшка, с помощью которой можно будет перемещаться по страницам сайта.

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd());
	
	if (request.url == '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' });
		response.write(await fs.promises.readFile(path.join(rootDir, 'src', 'favicon.ico')));
		response.end();
		return;

	}
	let statusCode;
	let data;
		
	let filePath = path.join(rootDir, 'src', request.url);
	console.log('Request path:', filePath);

	try {
		const stats = await fs.promises.stat(filePath);
		if (stats.isDirectory()) {
			filePath += '/index.html';
		}
		data = await fs.promises.readFile(filePath);
		statusCode = 200;			
	} catch (e) {
		console.error('Ошибка при обработке запроса:', e);
		filePath = path.join(rootDir, 'src', 'pages', '404.html');
		statusCode = 404;
		data = await fs.promises.readFile(filePath);
	}

	response.writeHead(statusCode, { 'Content-Type': getMimeType(filePath) });
	response.write(data);
	response.end();
}
).listen(3001);

function getMimeType(path) {
	let mimes = {
		html: 'text/html',
		jpeg: 'image/jpeg',
		jpg:  'image/jpeg',
		png: 'image/png',
		avif: 'image/avif',
		webp: 'image/webp',
		svg:  'image/svg+xml',
		json: 'application/json',
		js:   'text/javascript',
		css:  'text/css',
		ico:  'image/x-icon'
	};
	
	let exts = Object.keys(mimes);
	let extReg = new RegExp('\\.(' + exts.join('|') + ')$');
	
	let ext = path.match(extReg)[1];
	
	if (ext) {
		return mimes[ext];
	} else {
		return 'text/plain';
	}
}