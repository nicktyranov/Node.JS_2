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

// №1⊗ndExHbOO
// Дан следующий объект:

// let product = {
// 	name: 'prod',
// 	cost: 1000
// }
// Выведите данные этого объекта в представлении.
app.get('/1', (req, res) => {
	res.render('index', {
		product: {
			name: 'prod',
			cost: 1000
		},
		products: ['prod1', 'prod2', 'prod3']
	});
});

//Команда with в Handlebars в Express
app.get('/2', (req, res) => {
	res.render('index', {
		product: {
			name: 'prod',
			cost: 1000
		}
		
	});
});

app.listen(3000, () => console.log('Server started: http://localhost:3000'));