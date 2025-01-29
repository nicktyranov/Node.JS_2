// 
// Handlebars в Express
//18. Смена макета в Handlebars Express
import express from 'express';
import expressHandlebars from 'express-handlebars';


const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs',
	helpers: {
		timeRN: function () {
			return new Intl.DateTimeFormat('US-us', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date());
		}
	}
});

let app = express();
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());


app.get('/18', (req, res) => {
	let layout = 'main';

	if (req.query.a !== undefined) {
		layout = 'admin';
	} else if (req.query.u !== undefined) {
		layout = 'user';
	}

	res.render('index', {
		text: 'loremloremloremloremloremlorem',
		layout: layout
	});
});

//Хелперы в Handlebars Express//
// №1⊗ndExHpInr
// Сделайте хелпер, выводящий текущий час, минуту и секунду в каком-нибудь формате.
app.get('/18-2', (req, res) => {
	
	res.render('index', {
		text: 'loremloremloremloremloremlorem'
		
	});
});



app.listen(3000, () => console.log('Server started: http://localhost:3000'));