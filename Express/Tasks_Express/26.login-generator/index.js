import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.render('index', { layout: false });
});

app.post('/', async (req, res) => {
	if (!req.body.letters) {
		return res.render('index', {
			layout: false,
			error: 'error: enter preferable letters and symbols'
		});
	}
	let login = await makeLogin(req.body.rangeSym, req.body.letters);
	console.log(`login - ${login}`);
	res.render('index', { layout: false, login: login });
});

function makeLogin(length = 6, symbols) {
	if (symbols.length === 0) {
		return 'error: enter preferable letters and symbols';
	}
	let arr = symbols.split('');
	let rez = '';
	for (let i = 0; i < Number(length); i++) {
		rez += isTrue()
			? arr[Math.floor(Math.random() * arr.length)].toUpperCase()
			: arr[Math.floor(Math.random() * arr.length)].toLowerCase();
	}

	function checkLogin(symbols, rez) {
		let result = true;
		for (let i = 0; i < symbols.length; i++) {
			if (rez.indexOf(symbols[i]) === -1) {
				result = false;
				break;
			}
		}
		return result;
	}

	if (!checkLogin) {
		return makeLogin(length, symbols);
	} else {
		return rez;
	}
}

function isTrue() {
	return Math.random() > 0.5;
}

app.listen(3000, () => {
	console.log('Server is run: http://localhost:3000');
});
