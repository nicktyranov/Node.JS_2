import fs from 'fs';

// №1⊗ndPmFSCl
// Дан файл с числом. Прочитайте этот файл и выведите в консоль квадрат этого числа.

fs.readFile('num.txt', (err, data) => {
	let rez = Number(data) ** 2;
	console.log(rez);
});

// №2⊗ndPmFSCl
// Проверьте, что код после метода readFile будет выполнен раньше, чем будет прочитан файл.
fs.readFile('num.txt', (err, data) => {
	let rez = Number(data) ** 2;
	console.log(rez + 1);
});
console.log('first');

// №3⊗ndPmFSCl
// Попробуйте прочитать несуществующий файл. Убедитесь, что при этом произойдет исключительная ситуация. Допишите ваш код так, чтобы он обрабатывал эту ситуацию.
fs.readFile('qqq.txt', (err, data) => {
	if (!err) {
		console.log(data);
	} else {
		console.log('Файл не найден: ' + err);
	}
});

// №4⊗ndPmFSCl
// С помощью цикла создайте 10 файлов, содержащих целые числа от 1 до 10.
for (let i = 1; i < 11; i++){
	fs.writeFile('num' + i + '.txt', i.toString(), (err) => {
		if (err) {
			console.log(err);
		}
	});
}

// №5⊗ndPmFSCl
// Даны три файла с числами. Выведите в консоль сумму этих чисел.
fs.readFile('num1.txt', (err, data1) => {
	if (!err) {
		fs.readFile('num2.txt', (err, data2) => {
			if (!err) {
				fs.readFile('num3.txt', (err, data3) => {
					if (!err) {
						let rez = Number(data1) + Number(data2) + Number(data3);
						console.log(rez);
					}
				});
		 	}
		});
	}

});

// №6⊗ndPmFSCl
// Даны пять файлов с числами. Выведите в консоль сумму этих чисел.
let result = 0;
let completed = 0;
for (let i = 1; i < 6; i++){
	fs.readFile('num' + i + '.txt', (err, data) => {
		
		if (!err) {
			result += Number(data);
			completed++;

			if (completed === 5) {
				console.log(`Final result = ${result}`);
			}
		} else {
			console.log(err);
		}
	});
}

// №7⊗ndPmFSCl
// Дан файл с числом. Запишите в этот файл квадрат этого числа.
fs.readFile('num.txt', (err, data) => {
	if (!err) {
		let newNum = Number(data) ** 2;
		fs.writeFile('num.txt', newNum.toString(), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
});

// №8⊗ndPmFSCl
// Даны три файла с числами. Запишите в новый файл сумму этих чисел.
let sum = 0;
let finished = 0;
for (let i = 1; i < 4; i++){
	fs.readFile('num' + i + '.txt', (err, data) => {
		if (!err) {
			sum += Number(data);
			finished++;

			if (finished === 3) {
				fs.writeFile('sum.txt', sum.toString(), (err) => {
					if (err) {
						console.log(err);
					}
				});
			}

		}
	});
}

// №9⊗ndPmFSCl
// Дан код:

// fs.readFile('readme1.txt', 'utf8', function(err, data1) {
// 	if (!err) {
// 		fs.readFile('readme2.txt', 'utf8', function(err, data2) {
// 			if (!err) {
// 				fs.writeFile('readme.txt', data1 + data2, function(err) {
// 					if (err) {
// 						console.log('ошибка записи файла');
// 					}
// 				});
// 			} else {
// 				console.log('ошибка чтения файла readme2');
// 			}
// 		});
// 	} else {
// 		console.log('ошибка чтения файла readme1');
// 	}
// });
// Перепишите его через стрелочные функции.

fs.readFile('readme1.txt', 'utf8', (err, data1) => {
	if (!err) {
		fs.readFile('readme2.txt', 'utf8', (err, data2) => {
			if (!err) {
				fs.writeFile('readme.txt', data1 + data2, (err) => {
					if (err) {
						console.log('ошибка записи файла');
					}
				});
			} else {
				console.log('ошибка чтения файла readme2');
			}
		});
	} else {
		console.log('ошибка чтения файла readme1');
	}
});