import http from 'http';
import fs from 'fs';
import path from 'path';

// №5⊗ndPmSvDr
// Возьмите созданный вами в предыдущем уроке сайт из 6-ти страниц. Переделайте его в соответствии с данным уроком.

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd(), 'src'); // Корневая директория для файлов

	let lpath = './src/layout.html';
	let tpath = './src/pages/title.html'; 

	let mimeType = 'text/html';

	let statusCode;
	let data;
	let layout = '';
	let content = '';
	let title = '';

	let filePath = path.join(rootDir, request.url);
	console.log('Request path:', filePath);
	if (request.url !== '/') {
		if (!path.extname(filePath)) {
			filePath += '.html';
		}
	}
	
	const ext = path.extname(filePath).slice(1); // Получаем расширение файла
	mimeType = getMimeType(ext);

	if (['css', 'js', 'png', 'jpg', 'jpeg', 'ico', 'svg', 'webp'].includes(ext)) {
		try {
			const data = await fs.promises.readFile(filePath);
			response.writeHead(200, { 'Content-Type': mimeType });
			response.end(data);
			return;
		} catch (e) {
			console.error('Ошибка загрузки статического файла:', e);
			response.writeHead(404, { 'Content-Type': 'text/plain' });
			response.end('404 Not Found');
			return;
		}
	}

	try {
		let stats =  await fs.promises.stat(filePath);
		
		if (stats.isDirectory()) {
			filePath = path.join(filePath, 'index.html');
		}
		
		// data = await fs.promises.readFile(filePath);
		layout = await fs.promises.readFile(lpath, 'utf8');
		console.log(`layout path: ${lpath}`);
		console.log(`title path: ${tpath}`);
		title = await fs.promises.readFile(tpath, 'utf8');
		console.log(`title: ${title}`);
		layout = layout.replace(/\{% get title %\}/, title);

		statusCode = 200;
	} catch (e) {
		console.error('Ошибка при обработке запроса:', e);

		filePath = path.join(rootDir, 'pages', '404.html');
		
	}
	
	const contentType = getMimeType(path.extname(filePath).slice(1));
	response.writeHead(statusCode, { 'Content-Type': contentType });
	response.end(layout);
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

