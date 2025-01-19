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

let userRouter = express.Router();
// №1⊗ndExRtGr
// Разбейте следующие маршруты по группам:
userRouter.get('/show/:id', function(req, res) {
	
});
userRouter.get('/edit/:id', function(req, res) {
	
});
app.use('/city', userRouter);

// app.get('/country/list', function(req, res) {
	
// });
// app.get('/country/show/:id', function(req, res) {
	
// });
// app.get('/country/edit/:id', function(req, res) {
	
// });
let userRouter2 = express.Router();
userRouter2.get('/list', function(req, res) {
	
});
userRouter2.get('/show/:id', function(req, res) {
	
});
userRouter2.get('/edit/:id', function(req, res) {
	
});
app.use('/country', userRouter2);

app.listen(3000, () => console.log('Server started: http://localhost:3000'));