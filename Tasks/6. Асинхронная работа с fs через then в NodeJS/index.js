import fs from 'fs';

// №1⊗ndPmFSThn
// Пусть в файле записано число. Прочитайте этот файл и выведите в консоль сумму цифр этого числа.
fs.promises.readFile('readme.txt', 'utf-8').then((data) => {
	return console.log(data.split('').reduce((acc, item) => acc + Number(item), 0));
});

// №2⊗ndPmFSThn
// Попробуйте прочитать несуществующий файл. Убедитесь, что при этом произойдет исключительная ситуация. Допишите ваш код так, чтобы он обрабатывал эту ситуацию.
fs.promises.readFile('readmeUndefined.txt', 'utf-8').then((data) => {
	return console.log(data.split('').reduce((acc, item) => acc + Number(item), 0));
}).catch((err) => console.log(err));

// №3⊗ndPmFSThn
// Пусть в файле через запятую записаны числа. Сделайте скрипт, который запишет каждое из этих чисел в отдельный файл.

fs.promises.readFile('readme1.txt', 'utf-8').then((data) => {
	let tempArr = data.split(',');
	for (let i = 0; i < tempArr.length; i++) {
		fs.promises.writeFile(`task3-rez${i + 1}.txt`, tempArr[i], 'utf-8');
	}
}).catch((err) => console.log(err));

// №4⊗ndPmFSThn
// Пусть у вас есть 5 файлов с числами. Найдите сумму этих чисел и запишите в новый файл.
let dataFiles = [];
for (let i = 0; i < 5; i++) {
	dataFiles.push(fs.promises.readFile(`task3-rez${i + 1}.txt`, 'utf-8'));
}
Promise.all(dataFiles).then((data) => {
	let rez = data.reduce((acc, x) => acc + Number(x), 0);
	fs.promises.writeFile('task4-rez.txt', rez.toString(), 'utf-8');
	return console.log(`task-4: done – rez: ${rez}`);
}).catch((err) => console.log(err));