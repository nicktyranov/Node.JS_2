// Роутинг и файлы в Express
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();
app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
// №1⊗ndExRtFl
// Пусть у вас есть несколько папок, а в этих папках хранятся файлы. Сделайте маршрут, отдающий заданный файл из заданной папки.

// №2⊗ndExRtFl
// Модифицируйте предыдущую задачу так, чтобы для несуществующего файла отдавалась 404 ошибка.

app.get('/task-1/:num', (req, res) => {
	let num = Number(req.params.num);
	console.log(num);
	if (num > 0 && num < 3) {
		res.sendFile(__dirname + `/task-1/${num}/` + `${num}.txt`);
	} else {
		res.status(404).send('Not found');
	}
});



app.listen(3000, () => console.log('Server started: http://localhost:3000'));