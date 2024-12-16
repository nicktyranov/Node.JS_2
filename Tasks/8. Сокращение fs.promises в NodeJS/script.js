// №1⊗ndPmFSFPSh
// Дан следующий код:

// import fs from 'fs';

// async function func() {
// 	let data = await fs.promises.readFile('readme.txt', 'utf8');
// 	console.log(data);
// }

// func();
// Упростите его согласно изученной теории.

import fs from 'fs/promises';

async function func() {
	let data = await fs.readFile('readme.txt', 'utf8');
	console.log(data);
}

func();