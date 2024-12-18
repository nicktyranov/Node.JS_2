import http from 'http';
import fs from 'fs';
import path from 'path';

// №1⊗ndPmSvSt
// Рееализуйте описанный статический сервер.

// №2⊗ndPmSvSt
// Сделайте так, чтобы 404 страница тоже бралась из файла, например, из файла root/404.html.

// №3⊗ndPmSvSt
// При обращении к папке URL со слешем /dir/sub/ и без слеша считаются одинаковым /dir/sub и оба ведут на index папки. Проверьте, как наш сервер справляется с этим. Если есть какие-то проблемы - исправьте их.

http.createServer(async (request, response) => {
	const rootDir = path.join(process.cwd());
	
	if (request.url !== '/favicon.ico') {
		let statusCode;
		let data;
		
		let filePath = path.join(rootDir, request.url);
		console.log('Request path:', filePath);

		// const ext = path.extname(filePath);
		// const contentType = getContentType(ext);
		try {
			const stats = await fs.promises.stat(filePath);
			if (stats.isDirectory()) {
				filePath += '/index.html';
			}
			data = await fs.promises.readFile(filePath);
			statusCode = 200;			
		} catch (e) {
			console.error('Ошибка при обработке запроса:', e);
			filePath ='404.html';
			statusCode = 404;
			data = await fs.promises.readFile(filePath);
		}

		response.writeHead(statusCode, { 'Content-Type': getMimeType(filePath) });
		response.write(data);
		response.end();
	}
}).listen(3000);

// №4⊗ndPmSvSt
// Скопируйте функцию getMimeType из учебника. Исправьте код вашего сервера, используя эту функцию.

function getMimeType(path) {
	let mimes = {
		html: 'text/html',
		jpeg: 'image/jpeg',
		jpg:  'image/jpeg',
		png:  'image/png',
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