import http from 'http';
import fs from 'fs';
import path from 'path';

// // №1⊗ndPmSvSt
// // Рееализуйте описанный статический сервер.

// // №2⊗ndPmSvSt
// // Сделайте так, чтобы 404 страница тоже бралась из файла, например, из файла root/404.html.

// // №3⊗ndPmSvSt
// // При обращении к папке URL со слешем /dir/sub/ и без слеша считаются одинаковым /dir/sub и оба ведут на index папки. Проверьте, как наш сервер справляется с этим. Если есть какие-то проблемы - исправьте их.

// http.createServer(async (request, response) => {
// 	const rootDir = path.join(process.cwd());
	
// 	if (request.url !== '/favicon.ico') {
// 		let statusCode;
// 		let data;
		
// 		let filePath = path.join(rootDir, request.url);
// 		console.log('Request path:', filePath);

// 		// const ext = path.extname(filePath);
// 		// const contentType = getContentType(ext);
// 		try {
// 			const stats = await fs.promises.stat(filePath);
// 			if (stats.isDirectory()) {
// 				filePath += '/index.html';
// 			}
// 			data = await fs.promises.readFile(filePath);
// 			statusCode = 200;			
// 		} catch (e) {
// 			console.error('Ошибка при обработке запроса:', e);
// 			filePath ='404.html';
// 			statusCode = 404;
// 			data = await fs.promises.readFile(filePath);
// 		}

// 		response.writeHead(statusCode, { 'Content-Type': getMimeType(filePath) });
// 		response.write(data);
// 		response.end();
// 	}
// }).listen(3000);

// // №4⊗ndPmSvSt
// // Скопируйте функцию getMimeType из учебника. Исправьте код вашего сервера, используя эту функцию.

// function getMimeType(path) {
// 	let mimes = {
// 		html: 'text/html',
// 		jpeg: 'image/jpeg',
// 		jpg:  'image/jpeg',
// 		png:  'image/png',
// 		svg:  'image/svg+xml',
// 		json: 'application/json',
// 		js:   'text/javascript',
// 		css:  'text/css',
// 		ico:  'image/x-icon'
// 	};
	
// 	let exts = Object.keys(mimes);
// 	let extReg = new RegExp('\\.(' + exts.join('|') + ')$');
	
// 	let ext = path.match(extReg)[1];
	
// 	if (ext) {
// 		return mimes[ext];
// 	} else {
// 		return 'text/plain';
// 	}
// }

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd(), 'src'); // Корневая директория для файлов

	let statusCode;
	let data;

	// Формируем путь для запрашиваемого ресурса
	let filePath = path.join(rootDir, request.url);
	console.log('Request path:', filePath);

	try {
		let stats;
		try {
			stats = await fs.promises.stat(filePath); // Проверяем, существует ли путь
		} catch {
			// Если путь не найден, пробуем добавить расширение .html
			if (!filePath.endsWith('.html')) {
				filePath += '.html';
			}
			stats = await fs.promises.stat(filePath);
		}

		if (stats.isDirectory()) {
			// Если директория, ищем index.html
			filePath = path.join(filePath, 'index.html');
		}

		// Чтение файла
		data = await fs.promises.readFile(filePath);
		statusCode = 200;
	} catch (e) {
		console.error('Ошибка при обработке запроса:', e);

		// Если файл не найден, возвращаем 404.html
		filePath = path.join(rootDir, 'pages', '404.html');
		try {
			data = await fs.promises.readFile(filePath);
			statusCode = 404;
		} catch {
			data = '404 Not Found';
			statusCode = 404;
		}
	}

	// Определяем MIME-тип
	const contentType = getMimeType(path.extname(filePath).slice(1));
	response.writeHead(statusCode, { 'Content-Type': contentType });
	response.end(data);
}).listen(3000, () => {
	console.log('Server is running at http://localhost:3000');
});

// Функция для определения MIME-типа
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
