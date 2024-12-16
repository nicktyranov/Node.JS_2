// №1⊗ndPmFSRP
// Напишите код, который прочитает содержимое текстового файла:

// index.js
// /dir1/dir2/readme.txt

let path = '/dir1/dir2/readme.txt';
let data = await fs.promises.readFile(path, 'utf8');

// №2⊗ndPmFSRP
// Напишите код, который прочитает содержимое текстового файла:

// /script/
// index.js

// /dir1/
// /dir2/
// readme.txt

let path = '../dir1/dir2/readme.txt';
let data = await fs.promises.readFile(path, 'utf8');


// №3⊗ndPmFSRP
// Напишите код, который прочитает содержимое текстового файла:

// /script1/
// /script2/
// index.js
// /dir/
// readme.txt
let path = '../../dir1/readme.txt';
let data = await fs.promises.readFile(path, 'utf8');

// №4⊗ndPmFSRP
// Напишите код, который прочитает содержимое текстового файла:

// /script1/
// /script2/
// /script3/
// index.js
// /dir1/
// /dir2/
// /dir3/
// readme.txt

let path = '../../../dir1/dir2/dir3/readme.txt';
let data = await fs.promises.readFile(path, 'utf8');