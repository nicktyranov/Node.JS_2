import express from 'express';
const app = express();

app.get('/', (req, res) => {
	res.send('Hello from test2.com');
});

const PORT = 3002;
app.listen(PORT, () => {
	console.log(`Server test1.com running on port ${PORT}`);
});
