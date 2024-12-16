import fs from 'fs/promises';
import { constants } from 'fs';

// №1⊗ndPmFSECh
// Проверьте, существует ли файл test.txt. Если существует, прочитайте его текст.

async function checkAccess() {
	try {
		await fs.access('test.txt', constants.F_OK);
		console.log('file exists');
	} catch (e) {
		console.log(`file does not exists: ${e}`);
	}
}
checkAccess();