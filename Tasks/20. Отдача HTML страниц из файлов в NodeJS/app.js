import http from 'http';
import fs from 'fs';

// №1⊗ndPmSvHF
// Дан объект с URL-лами и соответствующими им именам HTML страниц:

// let obj = {
// 	'/page1': 'file1.html',
// 	'/page2': 'file2.html',
// 	'/page3': 'file3.html',
// }
// Сделайте сервер на основе этого объекта. При запросе существующего в объекте адреса отдавайте соответствующую страницу, а при запросе отсутствующего - сообщение об ошибке и статус 404.

let obj = {
	'/page1': 'file1.html',
	'/page2': 'file2.html',
	'/page3': 'file3.html'
};
http.createServer(async (request, response) => {
	let status = 200;
	let text;
	if (request.url != '/favicon.ico') {
		if (obj.hasOwnProperty(request.url)) {
			text = await fs.promises.readFile(obj[request.url]);
		} else {
			status = 404;
			text = 'Page not found';
		}
	}
		
	response.writeHead(status, { 'Content-Type': 'text/html' });
	response.write(text);
	response.end();
	
}).listen(3000);

