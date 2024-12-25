import http from 'http';
import fs from 'fs';
import path from 'path';

// №5⊗ndPmSvDr
// Возьмите созданный вами в предыдущем уроке сайт из 6-ти страниц. Переделайте его в соответствии с данным уроком.

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd(), 'src'); // Корневая директория для файлов

	let lpath = './src/layout.html';
	let tpath = './src/pages/title.html'; 
	let contentPath = '';

	let mimeType = 'text/html';

	let statusCode;
	let layout = '';
	let content = '';
	let title = '';
	// let css = '';

	let filePath = path.join(rootDir, request.url);
	console.log('Request path:', filePath);
	
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
		if (mimeType === 'text/html') {
			tpath = path.join(filePath, 'title.html');
			contentPath = path.join(filePath, 'content.html');

			layout = await fs.promises.readFile(lpath, 'utf8');
			title = await fs.promises.readFile(tpath, 'utf8');
			content = await fs.promises.readFile(contentPath, 'utf8');

			let reg = /\{% get element '(.+?)' %\}/g;

			let matches = [...layout.matchAll(reg)];
			console.log('Найденные элементы для замены:', matches);

			for (let match of matches) {
				console.log('Обрабатываем элемент:', match[1]);
				let elementName = match[1]; // Имя элемента, например 'header'
				let elementPath = path.join(rootDir, 'elems', `${elementName}.html`);
				
				try {
					// Чтение содержимого элемента
					let elementContent = await fs.promises.readFile(elementPath, 'utf8');
					// Замена команды на содержимое файла
					layout = layout.replace(match[0], elementContent);
				} catch (err) {
					console.error(`Ошибка загрузки элемента ${elementName}:`, err);
					layout = layout.replace(match[0], `<p>Ошибка загрузки элемента: ${elementName}</p>`);
				}
			}

			// Замена плейсхолдеров
			layout = layout.replace(/\{% get title %\}/, title);
			layout = layout.replace(/\{% get content %\}/, content);

			statusCode = 200;
		} else {
			throw new Error('Unsupported MIME type');
		}
	} catch (e) {
		console.error('Ошибка при обработке запроса:', e);
		filePath = path.join(rootDir, 'pages', '404.html');
		layout = '<h1>404 Not Found</h1>';
		statusCode = 404;
	}
	
	const contentType = getMimeType(path.extname(filePath).slice(1));
	response.writeHead(statusCode, { 'Content-Type': contentType });
	console.log('Content-Type:', contentType);
	console.log('Layout content:', layout);

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
	return mimes[ext] || 'text/html';
}

