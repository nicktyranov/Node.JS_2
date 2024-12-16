
import fs from 'fs';


// №1⊗ndPmFSSt
// Сделайте файл достаточно большого размера. Прочитайте его по кусочкам и выведите каждый кусочек в консоль.
let readStream = fs.createReadStream('50mb_file.txt', 'utf8');

readStream.on('data', (part) => {
	console.log(part);
});

// №2⊗ndPmFSSt
// Запишите в файл столбец чисел от одного до миллиона.

let writeStream = fs.WriteStream('task-2.txt', 'utf8');
for (let i = 1; i <= 1000000; i++) {
	writeStream.write(`${i}\n`);
	if (i == 1000000) {
		writeStream.end();
	}
}

// №3⊗ndPmFSSt
// Дан файл большого размера. Напишите код, который сделает три копии этого файла.
let i = 0;
while (i < 3) {
	let writeStream1 = fs.WriteStream(`task-3_${i}.txt`, 'utf8');
	try {
		readStream.on('data', (part) => { 
			writeStream1.write(part);
		});
		
		i++;
	} catch (e) {
		console.log(`error: ${e}`);
	}
	if (i == 3) {
		console.log('Done: 3 files');
	}
}