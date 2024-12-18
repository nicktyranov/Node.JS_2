import http from 'http';

// №1⊗ndPmSvSR
// Перепишите приведенный код через оператор switch-case.
http.createServer((request, response) => {
	if (request.url != '/favicon.ico') {
		let text;
		let status = 200;

		switch (true) {
		case request.url == '/page1': {
			text = '1';
			break;
		}
				
		case request.url == '/page2': {
			text = '2';
			break;		
		}
		case request.url == '/page3': {
			text = '3';
			break;
	
		}
		default: {
			text = '404';
			status = 404;
			break;
		}
		}
		
		response.writeHead(status, {'Content-Type': 'text/html'});
		response.end();
	}
}).listen(3000);


// №2⊗ndPmSvSR
// Дан объект с URL-лами и соответствующими им текстами страниц:

// let obj = {
// 	'/page1': '1',
// 	'/page2': '2',
// 	'/page3': '3',
// }
// Сделайте сервер на основе этого объекта. При запросе существующего в объекте адреса отдавайте соответствующий текст, а при запросе отсутствующего - сообщение об ошибке и статус 404.
let obj = {
	'/page1': '1',
	'/page2': '2',
	'/page3': '3'
};
http.createServer((req, res) => {
	if (req.url !== '/favicon.ico') {
		console.log(req.url);
		let text;
		res.statusCode = 200;

		switch (true) {
		case req.url == '/page1': {
			text = obj['/page1'];
			break;
		}
		case req.url == '/page2': {
			text = obj['/page2'];
			break;
		}
		case req.url == '/page3': {
			text = obj['/page3'];
			break;
		}
		default: {
			text = '404';
			res.statusCode = 404;
			break;
		}
		}
		res.writeHead(res.statusCode, {'Content-Type': 'text/html'});
		res.write(text);
		res.end();
	}
}).listen(3001);