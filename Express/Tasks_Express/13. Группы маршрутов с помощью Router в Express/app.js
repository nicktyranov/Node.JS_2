// Handlebars в Express
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



app.listen(3000, () => console.log('Server started: http://localhost:3000'));