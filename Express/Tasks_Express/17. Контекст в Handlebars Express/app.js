// Handlebars в Express
//17. Контекст в Handlebars Express
import express from 'express';
import expressHandlebars from 'express-handlebars';


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

// №1⊗ndExHbCtx
// Пусть в представление передаются следующие данные:

// res.render('page', {
// 	amount: 10,
	
// 	product: {
// 		name: 'prod',
// 		cost: 1000,
// 		amount: 5
// 	}
// });
// Выведите данные продукта в конструкции with. Там же выведите значение переменной amount.
app.get('/17', (req, res) => {
	res.render('index', {
		amount: 10,
	
		product: {
			name: 'prod',
			cost: 1000,
			amount: 5
		}
	});
});


//Циклы в Handlebars Express

/*
№1⊗ndExHbLp
Дан следующий массив:

let products = ['prod1', 'prod2', 'prod3'];
Выведите его в виде списка.
*/

app.get('/17-1', (req, res) => {
	
	res.render('index', {
		products: ['prod1', 'prod2', 'prod3']
	});
});


//Условия в Handlebars Express
/*
№1⊗ndExHbCn
Пусть в представление передаются следующие переменные:

res.render('page', {
	show1: true,
	show2: false,
	show3: true,
});
Пусть у нас есть три блока:

<div>
	block 1
</div>
<div>
	block 2
</div>
<div>
	block 3
</div>
Сделайте так, чтобы каждый блок был видимым, если соответствующая ему переменная истинна.
*/
app.get('/17-2', (req, res) => {
	
	res.render('index', {
		show1: true,
		show2: false,
		show3: true
	});
});


app.listen(3000, () => console.log('Server started: http://localhost:3000'));