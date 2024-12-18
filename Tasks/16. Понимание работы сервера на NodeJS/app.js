import http from 'http';

// №1⊗ndPmSvUn
// Пусть изначально наш счетчик имеет значение 100. Каждый запрос уменьшайте это значение на единицу и отдавайте новое значение в браузер. Как только счетчик дойдет до нуля, выведите результатом запроса сообщение об этом.
let i = 100;
// почему убавляется с шагом 2?

http.createServer((req, res) => {
	console.log('server run');
	res.writeHead(200, { 'Content-Type': 'text/html' });
	if (i > 0) {
		res.write(`<h1>${i}</h1>`);
		i--;
	} else {
		res.write('<h1>the end</h1>');
	}

	res.end();
}).listen(2999);