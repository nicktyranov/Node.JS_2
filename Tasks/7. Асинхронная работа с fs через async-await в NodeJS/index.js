import fs from 'fs';
// Асинхронная работа с fs через async-await в NodeJS

// №1⊗ndPmFSAA
// Даны два файла с числами. Найдите сумму этих чисел и запишите результат в третий файл.
async function task1() {
	try {
		const data = [];
		data.push(await fs.promises.readFile('num1.txt', 'utf-8'));
		data.push(await fs.promises.readFile('num2.txt', 'utf-8'));
		let rez = 0;
		for (let el of data) {
			rez += Number(el);
		}
		console.log(rez);
	} catch (e) {
		console.log(e);
	}
}
task1(); 

// №2⊗ndPmFSAA
// Дан массив имен файлов. Переберите этот массив циклом и создайте файлы с этими именами, записав при создании в каждый файл случайное число. После этого в цикле прочитайте содержимое всех файлов и найдите сумму их чисел. Запишите ее в новый файл.
async function task2() {
	try {
		const data = ['name1', 'name2', 'name3'];
		for (let i = 0; i < data.length; i++) {
			await fs.promises.writeFile(data[i] + '.txt', ((Math.random() * (i + 1) * 100).toFixed(0)).toString());
		}
		let rez = 0;
		for (let i = 0; i < data.length; i++) {
			rez += Number(await fs.promises.readFile(`name${i+1}.txt`, 'utf-8'));
		}
		console.log(rez);
	} catch (e) {
		console.log(e);
	}
}
task2(); 