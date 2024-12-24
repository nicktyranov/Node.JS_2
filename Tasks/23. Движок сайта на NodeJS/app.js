import http from 'http';
import fs from 'fs';
import path from 'path';

// №1⊗ndPmSvDr
// Возьмите приведенный код и потестируйте его работу.

// №2⊗ndPmSvDr
// Реализуйте показ 404 страницы в случае, если URL не соответствует файлу. Пусть 404 страница хранится в файле page/404/title.html и page/404/content.html.

// №3⊗ndPmSvDr
// Добавьте к вашему коду работу с ресурсами.

// №4⊗ndPmSvDr
// Кроме тайтла и контента на страницах сайта может также изменяться мета-описание (погуглите). Реализуйте возможность добавлять его к страницам сайта.

http.createServer(async (request, response) => {
	let lpath = 'layout.html'; 
	let cpath = 'page' + request.url + 'content.html'; 
	let tpath = 'page' + request.url + 'title.html'; 
	let dpath = 'page' + request.url + 'meta.html';
	let ext = path.extname(request.url); 
	let mimeType = 'text/html';

	if (ext) {
		mimeType = getMimeType(ext);
		//предполагаем что все хранится в папке page – старт от этой папки
		const resourcePath = path.join('page', request.url);

		try {
			const resource = await fs.promises.readFile(resourcePath); 
			response.writeHead(200, { 'Content-Type': mimeType });
			response.end(resource);
		} catch (e) {
			console.error(`Resource not found: ${e.message}`);
			response.writeHead(404, { 'Content-Type': 'text/plain' });
			response.end('404 Resource Not Found');
		}
		return;
	}

	// Если нет расширения, это запрос на HTML-страницу
	let layout = '';
	let content = '';
	let title = '';
	let description = '';
	let statusCode = 200;

	try {
		layout = await fs.promises.readFile(lpath, 'utf8');
		content = await fs.promises.readFile(cpath, 'utf8');
		title = await fs.promises.readFile(tpath, 'utf8');
		description = await fs.promises.readFile(dpath, 'utf8');

		layout = layout.replace(/\{% get content %\}/, content);
		layout = layout.replace(/\{% get title %\}/, title);
		layout = layout.replace(/\{% get description %\}/, description);
	} catch (e) {
		console.error(`Error loading page files: ${e.message}`);
		statusCode = 404;
		try {
			layout = await fs.promises.readFile(lpath, 'utf8');
			content = await fs.promises.readFile('page/404/content.html', 'utf8');
			title = await fs.promises.readFile('page/404/title.html', 'utf8');

			layout = layout.replace(/\{% get content %\}/, content);
			layout = layout.replace(/\{% get title %\}/, title);
		} catch (error) {
			console.error(`Error loading 404 page: ${error.message}`);
			layout = '<h1>404 Page Not Found</h1>';
		}
	}

	response.writeHead(statusCode, { 'Content-Type': mimeType });
	response.write(layout || '<h1>Server Error</h1>');
	response.end();
}).listen(3000, () => {
	console.log('Server is running on port 3000');
});

function getMimeType(ext) {
	const mimeTypes = {
		'.html': 'text/html',
		'.css': 'text/css',
		'.js': 'application/javascript',
		'.json': 'application/json',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.gif': 'image/gif',
		'.svg': 'image/svg+xml',
		'.ico': 'image/x-icon',
		'.txt': 'text/plain'
	};

	return mimeTypes[ext] || 'application/octet-stream';
}

