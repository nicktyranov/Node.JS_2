import fs from 'fs';
// №1⊗ndPmFSPp
// С помощью канала прочитайте файл и запишите его данные в другой файл.
let readStream = fs.createReadStream('bigFile.txt');
let writeStream = fs.createWriteStream('smallFile.txt');

readStream.pipe(writeStream);

// №2⊗ndPmFSPp
// Даны 10 файлов. Напишите код, который заархивирует каждый из этих файлов в свой архив.
import { createGzip } from 'zlib';
let i = 1;

while (i <= 10) {
	try {
		const inputFile = `num${i}.txt`;
		const outputFile = `num${i}.txt.gz`;

		
		const readStream = fs.createReadStream(inputFile);
		const writeStream = fs.createWriteStream(outputFile);

		
		readStream
			.pipe(createGzip())
			.pipe(writeStream)
			.on('finish', () => {
				console.log(`Файл ${inputFile} успешно заархивирован в ${outputFile}`);
			})
			.on('error', (err) => {
				console.error(`Ошибка при обработке файла ${inputFile}:`, err.message);
			});
	} catch (e) {
		console.log(`error: ${e.message}`);
	}
	i++;
}