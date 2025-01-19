import express from 'express';
let app = express();
app.get('/', (req, res) => {
	console.log('Main');
	res.send('Main');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
// №1⊗ndExRtPE
// Сделайте маршрут с некоторым параметром. Реализуйте проверку параметра на это, что это дата в формате год-месяц-день. Верните 404, если это не так.
// "2025-01-09"

app.get('/:date/', (req, res) => {
	if (checkDate(req.params.date)) {
		res.send('OK');
	} else {
		res.status(404).send('Not found');
		console.log(`req - ${req.params.date}
		checkDate(req.params.date)=${checkDate(req.params.date)}`);
	}
	
});

function checkDate(date) {
	const [year, month, day] = date.split('-');
	const parseDate = new Date(year, month - 1, day);
	if (parseDate.getFullYear() == year && parseDate.getMonth() == month - 1 && parseDate.getDate() == day) {
		return true;
	}
	return false; 
}

app.listen(3000, () => console.log('Server started: http://localhost:3000'));