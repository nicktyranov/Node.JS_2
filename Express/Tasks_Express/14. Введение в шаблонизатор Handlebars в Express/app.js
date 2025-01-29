// Handlebars в Express
import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';

const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs'
});

let app = express();
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

//расширения файлов указывать не нужно - и так подразумевается, что они hbs.
// app.get('/page/1/', function(req, res) {
// 	res.render('page1');
// });

// app.get('/page/2/', function(req, res) {
// 	res.render('page2');
// });

// app.get('/page/3/', function(req, res) {
// 	res.render('page2');
// });
app.get('/page/:page/', function(req, res) {
	res.render(req.params.page);
});


// №1⊗ndExHbLt
// Сделайте 5 файлов с контентом и один общий макет сайта. Напишите маршрут, отдающий соответствующий файл.

// №2⊗ndExHbLt
// Модифицируйте ваш код так, чтобы при запросе отсутствующего файла выполнялся рендеринг специального файла для 404 ошибки с выдачей соответствующего статуса.
app.set('views', './views');
app.get('/file/:fileNum', (req, res) => {
	if (req.params.fileNum < 1 || req.params.fileNum > 5) {
		throw new Error('Неверный номер файла');
	}
	try {
		res.render(`file/file${req.params.fileNum}`);
		res.sendFile(path.resolve(`views/file/file${req.params.fileNum}.hbs`));
	} catch (e) {
		res.status(404).render('404');
		res.sendFile(path.resolve('views/404.hbs')); // не работает
	}
	
});


app.listen(3000, () => console.log('Server started: http://localhost:3000'));