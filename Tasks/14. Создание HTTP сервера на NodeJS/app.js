import http from 'http';

// №1⊗ndPmSvDp
// Разверните сервер, отправляющий в браузер какой-нибудь текст.

http.createServer((req, res) => {
	res.write('test');
	res.end();
}).listen(3001);

// №2⊗ndPmSvDp
// Остановите запущенный сервер.
