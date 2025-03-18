import express from 'express';
const app = express();

app.get('/', (req, res) => {
	res.send('Hello from test1.com');
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server test1.com running on port ${PORT}`);
});
