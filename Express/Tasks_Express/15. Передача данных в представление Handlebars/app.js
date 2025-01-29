// Handlebars в Express
//Передача данных в представление Handlebars
import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import { text } from 'stream/consumers';

const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs'
});

let app = express();
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
// 	console.log('Main');
// 	res.send('Main');
// });
app.get('/favicon.ico', (req, res) => res.status(204).end());


// app.set('views', './views');
// №1⊗ndExHbDt
// Передайте в контент пять переменных. Выведите каждую переменную в своем абзаце.

app.get('/1/', (req, res) => {
	try {
		res.render('page1', {var1: '1', var2: '2', var3: '3', var4: '4', var5: '#'});
	} catch (e) {
		res.status(404).render('404');	
	}
});
// №2⊗ndExHbDt
// Передайте в контент переменную с путем к картинке. Выведите на экран соответствующее изображение.
app.get('/2/', (req, res) => {
	try {
		res.render('page1', {var6: 'https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg' });
	} catch (e) {
		res.status(404).render('404');	
	}
});

// №3⊗ndExHbDt
// Передайте в контент переменные с текстом и хрефом ссылки. Выведите в на экран ссылку, созданную с помощью этих переменных.
app.get('/3/', (req, res) => {
	try {
		res.render('page1', {url: 'https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg', text: 'URL TEXT' });
	} catch (e) {
		res.status(404).render('404');	
	}
});

// №4⊗ndExHbDt
// Запустите приведенный код у себя в браузере и посмотрите на разницу приведенных команд.
/*
<div>
	{{text}}
</div>
<div>
	{{{text}}}
</div>
------
<b>aaa</b>
aaa
*/
app.get('/page/', function(req, res) {
	res.render('page1', {text: '<b>aaa</b>'});
});

// Передача тайтла в Handlebars в Express
app.set('/views', './views');
app.get('/page/:page/', function(req, res) {
	res.render(`page/${req.params.page}`, { title: 'title ' + req.params.page });
});

/*
№1⊗ndExHbTt
Пусть на вашем сайте есть следующие страницы:

views/
index.hbs
about.hbs
conctacs.hbs
price.hbs
Пусть тайтлы ваших страниц хранятся в объекте, ключами которого служат адреса страниц, а значениями - их тайтлы:

let titles = {
	index:    'главная страница',
	about:    'о нас',
	conctacs: 'контакты',
	price:    'наш прайс'
}
Реализуйте вывод тайтлов для страниц.
*/
let titles = {
	index:    'главная страница',
	about:    'о нас',
	conctacs: 'контакты',
	price:    'наш прайс'
};

app.get('/', (req, res) => {
	res.render('index', { title: titles.index });
});

app.get('/:page', (req, res) => {
	res.render(`${req.params.page}`, { title: titles[req.params.page] });
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));