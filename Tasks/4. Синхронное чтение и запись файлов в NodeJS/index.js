import fs from 'fs';

// №1⊗ndPmFSSy
// Сделайте два файла, текстом которых будут некоторые числа. Напишите скрипт, который прочитает числа из файлов и выведет в консоль сумму этих чисел.
let num1 = fs.readFileSync('num1.txt');
let num2 = fs.readFileSync('num2.txt');
let rez = Number(num1) + Number(num2);
console.log(rez);

// №2⊗ndPmFSSy
// Дан объект:

// let obj = {
// 	'file1.txt': 'text1',
// 	'file2.txt': 'text2',
// 	'file3.txt': 'text3',
// }
// С помощью цикла для каждого элемента объекта создайте файл, именем которого будет свойство элемента, а текстом - значение свойства.

let obj = {
	'file1.txt': 'text1',
	'file2.txt': 'text2',
	'file3.txt': 'text3'
};
for (let key in obj) {
	let value = obj[key];
	fs.writeFileSync(key, value);
}

// №3⊗ndPmFSSy
// Дан файл с текстом. Запустите таймер, который каждые 5 секунд в конец этого файла будет записывать восклицательный знак.
setInterval(() => {
	let currentText = fs.readFileSync('text.txt');
	fs.writeFileSync('text.txt', currentText + '!');
	console.log('wrote');
}, 5000);

// №4⊗ndPmFSSy
// Дан файл, в тексте которого записано некоторое число. Напишите скрипт, который прочитает число из файла, прибавит к нему единицу и запишет новое число обратно в файл.

let currentNum = fs.readFileSync('num1.txt', 'utf-8');
let newNum = Number(currentNum) + 1;
fs.writeFileSync('num1.txt', newNum.toString());
console.log(fs.readFileSync('num1.txt', 'utf-8'));

// №5⊗ndPmFSSy
// Даны 3 файла с числами. Напишите скрипт, который прочитает числа из файлов, найдет их сумму и запишет ее в новый файл.
let result = 0;
for (let i = 1; i < 4; i++) {
	let currentNum = fs.readFileSync('num' + i + '.txt', 'utf-8');
	result += Number(currentNum);
}
fs.writeFileSync('result.txt', result.toString());

// №6⊗ndPmFSSy
// Попробуйте прочитать несуществующий файл. Убедитесь, что при этом произойдет исключительная ситуация. Допишите ваш код так, чтобы он обрабатывал эту ситуацию.
try {
	let file = fs.readFileSync('qqq.txt');
	console.log(file);
} catch (e) {
	console.log(`File system error – ${e} `);
}