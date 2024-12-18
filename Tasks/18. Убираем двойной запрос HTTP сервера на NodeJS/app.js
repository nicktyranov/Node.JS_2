import http from 'http';

// №1⊗ndPmSvDR
// Сделайте так, чтобы у вас не было двойного вывода в консоль.

http.createServer((req, res) => {
	if (req.url !== '/favicon.ico') {
		console.log(req.url); 
		console.log(req.method);
		console.log(req.headers);
		res.writeHead(200, {
			'content-type': 'text/html'
		});
		res.write('Hello World!');
		res.end();
	}
	
}).listen(3000);
